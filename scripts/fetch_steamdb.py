import json
import os
import urllib.parse
import urllib.request
from datetime import datetime, timezone

STATUS_FILE = os.path.join("public", "data", "status.json")
OUT_FILE = os.path.join("public", "data", "steamdb.json")

APP_IDS = {
    "Call of Duty": 1938090,
    "Counter-Strike 2": 730,
    "Delta Force": 2507950,
    "Rust": 252490,
    "BF6": 671860,
    "Battlefield 6": 671860,
    "Battlefield™ 6": 671860,
    "Apex": 1172470,
    "Apex Legends": 1172470,
    "Apex-Full": 1172470,
    "Apex-Lite": 1172470,
    "Arena Breakout": 2073620,
    "Arena Breakout Infinite": 2073620,
    "ARC Raiders": 1808500,
    "ARK Survival Ascended": 2399830,
    "ARK: Survival Ascended": 2399830,
    "ARKSA": 2399830,
    "ARK Survival Evolved": 346110,
    "ARK: Survival Evolved": 346110,
    "ARKSE": 346110,
    "Rainbow Six Siege: Full": 359550,
    "Rainbow Six Siege: Lite": 359550,
    "Rainbow Six Siege": 359550,
    "PUBG": 578080,
    "THE FINALS": 2073850,
    "WarThunder": 236390,
    "WarThunder FULL": 236390,
    "Beasts of Bermuda": 719890,
    "Dune Awakening": 1172710,
    "Escape From Tarkov": None,
    "EFT Full": None,
    "EFT-Full": None,
    "EFT-Lite": None,
    "EAC Spoofer": None,
    "Fortnite": None,
    "Hunt: Showdown": 594650,
    "Marvel Rivals": 2767030,
    "Gray Zone Warfare": 2479810,
    "Dark and Darker": 2016590,
    "DayZ": 221100,
    "Dead by Daylight": 381210,
    "Conan Exiles": 440900,
    "Hell Let Loose": 686810,
    "Palworld": 1623730,
    "SCUM": 513710,
    "SMITE 2": 2437170,
    "Sea of Thieves": 1172620,
    "Squad": 393380,
    "Unturned": 304930,
    "Naraka": 1203220,
    "Arma 3": 107410,
    "Arma Reforger": 1874880,
    "Battlebit": 671860,
    "The Finals": 2073850,
    "Farlight 84": 1928420,
    "STALCRAFT": 1818450,
    "The Isle Evrima": 376210,
    "Marathon": None,
    "Spoofer": None,
    "Active Matter": None,
    "Albion Online": 761890,
}

ALIASES = {
    "apex": "Apex Legends",
    "apex-full": "Apex Legends",
    "apex-lite": "Apex Legends",
    "arc raiders": "ARC Raiders",
    "arc raiders epic games": "ARC Raiders",
    "arc raiders steam": "ARC Raiders",
    "arc raiders xbox / ms store": "ARC Raiders",
    "arc raiders xp bot": "ARC Raiders",
    "ark survival ascended": "ARK Survival Ascended",
    "ark: survival ascended": "ARK Survival Ascended",
    "arksa": "ARK Survival Ascended",
    "ark sa": "ARK Survival Ascended",
    "ark: ascended": "ARK Survival Ascended",
    "ark survival evolved": "ARK Survival Evolved",
    "ark: survival evolved": "ARK Survival Evolved",
    "arkse": "ARK Survival Evolved",
    "battlefield™ 6": "Battlefield 6",
    "bf6": "Battlefield 6",
    "counter-strike 2": "Counter-Strike 2",
    "cs2": "Counter-Strike 2",
    "dayz full": "DayZ",
    "dayz lite": "DayZ",
    "deadbydaylight": "Dead by Daylight",
    "dune: awakening": "Dune Awakening",
    "farlight84": "Farlight 84",
    "hellll": "Hell Let Loose",
    "hll": "Hell Let Loose",
    "hunt": "Hunt: Showdown",
    "hunt showdown": "Hunt: Showdown",
    "marvelrivals": "Marvel Rivals",
    "rainbow six siege: full": "Rainbow Six Siege",
    "rainbow six siege: lite": "Rainbow Six Siege",
    "r6 siege x": "Rainbow Six Siege",
    "rust lite": "Rust",
    "stalcraft": "STALCRAFT",
    "the finals": "The Finals",
    "war thunder": "WarThunder",
    "warthunder full": "WarThunder",
}


def canonical_game_name(name):
    key = (name or "").strip().lower()
    if key in ALIASES:
        return ALIASES[key]
    return (name or "").strip()


def to_iso(ts):
    if not ts:
        return None
    return datetime.fromtimestamp(ts, timezone.utc).isoformat()


def fetch_latest_news(app_id):
    params = urllib.parse.urlencode(
        {
            "appid": str(app_id),
            "count": "1",
            "maxlength": "300",
            "format": "json",
        }
    )
    url = f"https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?{params}"
    with urllib.request.urlopen(url, timeout=30) as res:
        data = json.loads(res.read().decode("utf-8"))
    items = (((data or {}).get("appnews") or {}).get("newsitems") or [])
    if not items:
        return {"title": None, "url": None, "publishedAt": None}
    item = items[0]
    return {
        "title": item.get("title"),
        "url": item.get("url"),
        "publishedAt": to_iso(item.get("date")),
    }


NON_GAME_KEYWORDS = {
    "spoofer",
    "chams",
    "bot",
    "xp",
    "eac",
    "battleye",
    "cheat",
    "hwid",
    "loader",
}


def is_probably_non_game(game):
    key = (game or "").strip().lower()
    return any(word in key for word in NON_GAME_KEYWORDS)


def search_app_id(game):
    params = urllib.parse.urlencode({"term": game, "l": "english", "cc": "us"})
    url = f"https://store.steampowered.com/api/storesearch/?{params}"
    with urllib.request.urlopen(url, timeout=30) as res:
        data = json.loads(res.read().decode("utf-8"))
    items = data.get("items") or []
    if not items:
        return None
    return items[0].get("id")


def read_games_from_status():
    if not os.path.exists(STATUS_FILE):
        return sorted(APP_IDS.keys())

    with open(STATUS_FILE, "r", encoding="utf-8") as f:
        status = json.load(f)

    brands = status.get("brands", [])
    all_brand = next((b for b in brands if b.get("brand") == "All Brands"), None)
    source_products = (all_brand or {}).get("products", [])
    if not source_products:
        for brand in brands:
            source_products.extend(brand.get("products", []))

    seen = set()
    games = []
    for p in source_products:
        name = canonical_game_name(p.get("name"))
        if name and name not in seen:
            seen.add(name)
            games.append(name)
    return sorted(games)


def main():
    games = read_games_from_status()
    cache = {}
    rows = []

    for game in games:
        app_id = APP_IDS.get(game)

        if app_id is None and not is_probably_non_game(game):
            try:
                app_id = search_app_id(game)
            except Exception:
                app_id = None

        if app_id is None:
            continue

        row = {
            "game": game,
            "appId": app_id,
            "steamDbUrl": f"https://steamdb.info/app/{app_id}/" if app_id else None,
            "latestPatchTitle": None,
            "latestPatchUrl": None,
            "latestPatchPublishedAt": None,
            "status": "ok",
        }

        if app_id:
            try:
                if app_id not in cache:
                    cache[app_id] = fetch_latest_news(app_id)
                latest = cache[app_id]
                row["latestPatchTitle"] = latest.get("title")
                row["latestPatchUrl"] = latest.get("url")
                row["latestPatchPublishedAt"] = latest.get("publishedAt")
            except Exception as exc:
                row["status"] = "error"
                row["error"] = str(exc)

        rows.append(row)

    payload = {
        "success": True,
        "source": "steam-news-api+steamdb-links",
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "totalGames": len(rows),
        "mappedGames": len([r for r in rows if r.get("appId")]),
        "games": rows,
    }

    os.makedirs(os.path.dirname(OUT_FILE), exist_ok=True)
    with open(OUT_FILE, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print(
        "Updated steamdb.json "
        f"games={payload['totalGames']} mapped={payload['mappedGames']}"
    )


if __name__ == "__main__":
    main()
