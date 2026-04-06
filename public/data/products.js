const PRODUCTS = [
  {
    id: 'cosmo-naxo',
    name: 'Cosmo (Naxo)',
    category: 'Cheat',
    tags: ['apex','eft','rust','dayz'],
    requirements: {
      'TPM': 'N/A',
      'Secure Boot': 'DISABLED',
      'Virtualization': 'DISABLED',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'DISABLED'
    },
    supportedWindows: 'Apex, EFT, Rust — ALL versions\nDayZ — 25H2 & 24H2 NOT supported',
    otherRequirements: [
      'UEFI BIOS',
      'Visuals installed (*visual)',
      'Core Isolation OFF',
      'Fastboot disabled in BIOS & Windows'
    ],
    fixes: [
      {
        title: 'Hyper-V Error',
        content: 'Use the *cosmohyperv command.',
        commands: ['*cosmohyperv']
      },
      {
        title: 'Fastboot / Hiberboot',
        content: 'Copy-paste to customer:',
        codeBlocks: [
          'Open CMD as Admin and type:\nreg add "HKLM\\System\\CurrentControlSet\\Control\\Session Manager\\Power" /v "HiberbootEnabled" /t REG_DWORD /d "1" /f',
          'Then type:\npowercfg -h on',
          'Then go to: Control Panel → Hardware and Sound → Change What Power Buttons Do → Turn Off Fast Start Up'
        ]
      },
      {
        title: 'Mapping Driver Failed',
        content: 'Add this file to: C:\\Windows\\System32\\drivers then restart your PC.',
        links: ['https://mega.nz/file/TB1A0bbZ#oLP83kATOQzucyzfaHrtAE4-JD5-U3OblZ1VnzXVwDY']
      },
      {
        title: 'Driver Does Not Seem to Be Running / Contact Support',
        content: 'Navigate to: Computer\\HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management and remove LargePageDrivers.\nThen check C:\\Windows\\System32\\drivers and delete PMAD again.\nIf still unfixable, @ Senior Support — use *naxoticket command to add Naxo to the ticket.',
        commands: ['*naxoticket']
      }
    ]
  },
  {
    id: 'cosmo-pro',
    name: 'Cosmo Pro',
    category: 'Cheat',
    tags: ['warthunder','apex','all games'],
    requirements: {
      'TPM': 'N/A',
      'Secure Boot': 'DISABLED',
      'Virtualization': 'ENABLED',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'DISABLED'
    },
    supportedWindows: 'All Windows versions EXCEPT 25H2\n(Warthunder & Apex)',
    otherRequirements: [
      'UEFI BIOS',
      'Visuals installed (*visual)',
      'Core Isolation OFF',
      'Fastboot disabled in BIOS & Windows'
    ],
    fixes: [
      {
        title: 'Hyper-V Error',
        content: 'Use the *cosmohyperv command.',
        commands: ['*cosmohyperv']
      },
      {
        title: 'Warthunder Stuck at 15%',
        content: 'Copy the file path of Warthunder and paste it into the loader.'
      },
      {
        title: 'Website Opens but Error Persists — Install Python Manually',
        content: 'Follow these steps:',
        codeBlocks: [
          '1. Download python.zip from: http://warchill.xyz/python.zip',
          '2. Go to the temp folder: C:\\Users\\USERNAME\\AppData\\Local\\Temp and create a "python" folder there.',
          '3. Unzip the python.zip archive into the temp/python folder.',
          '4. Run the loader as admin again.'
        ]
      }
    ]
  },
  {
    id: 'atlas',
    name: 'Atlas',
    category: 'Cheat',
    tags: ['cod','all games','pubg'],
    requirements: {
      'TPM': 'N/A (ENABLED for COD)',
      'Secure Boot': 'DISABLED (except COD)',
      'Virtualization': 'DISABLED',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'ENABLED (DEFAULT)'
    },
    supportedWindows: 'ALL Windows versions',
    otherRequirements: [
      'UEFI BIOS',
      'Visuals installed (*visual)',
      'Core Isolation OFF'
    ],
    fixes: [
      {
        title: 'Meltdown / Spectre Protection Error',
        content: 'Download InSpectre, disable meltdown and spectre protection. Then go to C:\\ → find RSCFG folder → delete temp → restart PC and try again.',
        links: ['https://www.guru3d.com/download/download-inspectre/']
      },
      {
        title: 'Blue Screens',
        content: 'Disable the built-in spoofer.'
      },
      {
        title: 'Failed to Load Driver',
        content: 'Open CMD as admin and run sfc /scannow. Also confirm Core Isolation is disabled.',
        codeBlocks: ['sfc /scannow']
      },
      {
        title: 'Fatal Error — Engine Error',
        content: 'Open RivaTuner and set detection level to "None".'
      },
      {
        title: 'PUBG Blackscreen',
        content: 'Navigate to: C:\\(x86)\\Steam\\steamapps\\common\\PUBG\\TslGame\\Content\\Movies — delete the Movies folder.'
      }
    ]
  },
  {
    id: 'forge',
    name: 'Forge',
    category: 'Cheat',
    tags: ['all games','eac'],
    requirements: {
      'TPM': 'N/A',
      'Secure Boot': 'DISABLED',
      'Virtualization': 'DISABLED',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'DISABLED'
    },
    supportedWindows: 'ALL Windows versions',
    otherRequirements: [
      'UEFI BIOS',
      'Visuals installed (*visual)',
      'Core Isolation OFF'
    ],
    fixes: [
      {
        title: 'BSOD',
        content: 'Run the following commands in CMD as admin:',
        codeBlocks: [
          'sfc /scannow',
          'DISM.exe /Online /Cleanup-image /Restorehealth'
        ]
      },
      {
        title: 'Loader Closes at 100%',
        content: 'Sync your PC time.'
      },
      {
        title: 'bedaisy.sys / easyanticheat.sys Error',
        content: 'Run the Loader BEFORE launching the game.'
      },
      {
        title: 'I2 Error Fix',
        content: 'Check all anti-virus/anti-cheat software again. Ensure Core Isolation is disabled, Visuals are installed, and the loader is run as admin.'
      }
    ]
  },
  {
    id: 'astrozoom',
    name: 'Astrozoom',
    category: 'Cheat',
    tags: ['cod','all games'],
    requirements: {
      'TPM': 'N/A (enabled for COD)',
      'Secure Boot': 'DISABLED (enabled for COD)',
      'Virtualization': 'DISABLED',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'DISABLED'
    },
    supportedWindows: 'Windows 10 22H2 — Windows 11 23H2\nCOD only: supports 24H2 and 25H2',
    otherRequirements: [
      'UEFI BIOS',
      'Visuals installed (*visual)',
      'Core Isolation OFF'
    ],
    fixes: [
      {
        title: 'Loading mem_ctx Error',
        content: 'Uninstall ALL Anti-Cheats and Anti-Virus software, including: FaceIT, Vanguard, Anti-Cheat Expert, Kaspersky, McAfee, Malwarebytes.'
      },
      {
        title: 'Context Error #13 / Error 0x2',
        content: 'Unsupported Windows version.'
      },
      {
        title: 'Ntherr / Nreq Error',
        content: 'Check if the customer is not on a Virtual Machine or Virtual Desktop.'
      },
      {
        title: 'Connection Errors — Timeout / Couldn\'t Resolve Hostname',
        content: 'Use a VPN like ProtonVPN or Windscribe.'
      }
    ]
  },
  {
    id: 'supreme',
    name: 'Supreme',
    category: 'Cheat',
    tags: ['all games'],
    requirements: {
      'TPM': 'N/A',
      'Secure Boot': 'DISABLED',
      'Virtualization': 'N/A',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'ENABLED (Default)'
    },
    supportedWindows: 'ALL Windows versions',
    otherRequirements: [
      'UEFI BIOS',
      'Visuals installed (*visual)',
      'Core Isolation OFF'
    ],
    fixes: [
      {
        title: 'Invalid Processed Data 0x0',
        content: 'Use a VPN — this is caused by ISP blocking the connection.'
      },
      {
        title: 'Error #3B000000',
        content: 'Turn off Core Isolation and run in CMD as admin:',
        codeBlocks: ['bcdedit /set hypervisorlaunchtype off']
      },
      {
        title: 'Error Code 0x1 / 0x2',
        content: 'Uninstall any Anti-Cheat and restart your PC.'
      },
      {
        title: 'Error Code 0x3 / 0x7',
        content: 'Spoofed before injecting. Restart PC, then inject first.'
      }
    ]
  },
  {
    id: 'kane',
    name: 'Kane',
    category: 'Cheat',
    tags: ['rust','apex','pubg','dark and darker'],
    requirements: {
      'TPM': 'N/A',
      'Secure Boot': 'DISABLED',
      'Virtualization': 'ENABLED',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'ENABLED (Default)'
    },
    supportedWindows: 'ALL Windows versions',
    otherRequirements: [
      'UEFI BIOS',
      'Visuals installed (*visual)',
      'Core Isolation OFF',
      'Nvidia/AMD overlay',
      'Steelseries for: Rust, Apex, Dark and Darker, The Midnight Walkers, PUBG'
    ],
    fixes: [
      {
        title: 'Please Download and Install the Latest vc_redist Libs',
        content: 'Use command:',
        commands: ['*kaneamdmenufix']
      },
      {
        title: 'SVM/VMX Error',
        content: 'Disable Windows PIN (*pin command), then follow *iobit command.',
        commands: ['*pin', '*iobit'],
        links: ['https://www.youtube.com/watch?v=L-55o0UnHFU']
      },
      {
        title: 'No Menu',
        content: 'Update all GPU and Windows drivers. Ensure all visuals are installed. Disable all other overlays. Do NOT run Steam or GeForce Experience during injection.'
      }
    ]
  },
  {
    id: 'liquid',
    name: 'Liquid',
    category: 'Cheat',
    tags: ['eft','arc raiders','all games'],
    requirements: {
      'TPM': 'N/A',
      'Secure Boot': 'DISABLED',
      'Virtualization': 'ENABLED',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'ENABLED (Default)'
    },
    supportedWindows: 'ALL Windows versions',
    otherRequirements: [
      'UEFI BIOS',
      'Visuals installed (*visual)',
      'Core Isolation OFF',
      'EFT Chams: Press F1 in Main Menu to inject',
      'ARC Raiders — Steam only'
    ],
    fixes: [
      {
        title: 'Steelseries Setup',
        content: 'Use steelseries.com/gg:\nGENERAL → General section, enable Sonar. Then go to SONAR → Shortcuts tab, bind "F7" to Master - Volume Up. Press this bind before injection.'
      },
      {
        title: 'SVM/VMX Error',
        content: 'Disable Windows PIN (*pin command), then follow *iobit command.',
        commands: ['*pin', '*iobit']
      },
      {
        title: 'No Menu',
        content: 'Update all GPU and Windows drivers. Ensure all visuals are installed. Disable all other overlays.'
      }
    ]
  },
  {
    id: 'proaim',
    name: 'ProAim',
    category: 'Cheat',
    tags: ['all games'],
    requirements: {
      'TPM': 'N/A',
      'Secure Boot': 'DISABLED',
      'Virtualization': 'ENABLED',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'DISABLED'
    },
    supportedWindows: 'ALL Windows versions',
    otherRequirements: [
      'UEFI BIOS',
      'Visuals installed (*visual)',
      'Core Isolation OFF',
      'AMD: ensure NX Mode in BIOS is enabled (if getting hypervisor error after applying the fix)'
    ],
    fixes: [
      {
        title: 'No Menu / BSOD',
        content: 'Send the latest loader from: https://t.me/fecloaders\nIf still BSOD with latest loader, send *delay command. Have them add this file to the loader and run it.',
        commands: ['*delay'],
        links: ['https://t.me/fecloaders']
      },
      {
        title: 'Still BSOD? Get Minidump File',
        content: 'Go to C:\\Windows\\Minidump → find the latest created file → copy it to desktop → send it to support.',
        codeBlocks: ['C:\\Windows\\Minidump']
      }
    ]
  },
  {
    id: 'cobra',
    name: 'Cobra',
    category: 'Cheat',
    tags: ['all games'],
    requirements: {
      'TPM': 'N/A',
      'Secure Boot': 'DISABLED',
      'Virtualization': 'DISABLED',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'DISABLED'
    },
    supportedWindows: 'ALL Windows versions',
    otherRequirements: [
      'UEFI BIOS',
      'Visuals installed (*visual)',
      'Core Isolation OFF'
    ],
    fixes: [
      {
        title: 'Mapping Driver Failed',
        content: 'Disable all anti-cheats & anti-virus. Use *defendercontrol to ensure everything is disabled.',
        commands: ['*defendercontrol']
      },
      {
        title: 'Loader Connection Issues',
        content: 'Use PROTON VPN.'
      },
      {
        title: 'Crashing / BSOD',
        content: 'Make sure the customer selected the download with NO spoofer. EAC spoofer is not working. If they want the BE spoofer, have them disable TPM.'
      },
      {
        title: 'Overlay Issues',
        content: 'Disable ALL overlays: Discord, Steam, Medal, Nvidia/AMD, etc.'
      }
    ]
  },
  {
    id: 'athena',
    name: 'Athena',
    category: 'Cheat',
    tags: ['marvel','pubg','ow2','naraka','arc raiders'],
    requirements: {
      'TPM': 'N/A',
      'Secure Boot': 'DISABLED',
      'Virtualization': 'DISABLED',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'DISABLED'
    },
    supportedWindows: 'ALL Windows versions EXCEPT:\nMarvel, PUBG, OW2 and Naraka: 22H2 W10 only',
    otherRequirements: [
      'UEFI BIOS',
      'Visuals installed (*visual)',
      'Core Isolation OFF',
      'ARC: Steam only, DX12 must be used'
    ],
    fixes: [
      {
        title: 'Error Code 2145 / 2146',
        content: 'Tell a Senior to contact the developer — the uploaded file was corrupted during upload.'
      },
      {
        title: 'Crashing Loader',
        content: 'Paste this code into CMD as admin, then restart PC. Change "aaaaa14" to a custom name (all lowercase letters only):',
        codeBlocks: ['wmic computersystem where name="%computername%" call rename name="aaaaa14"']
      }
    ]
  },
  {
    id: 'kraken-games',
    name: 'Kraken (Games)',
    category: 'Cheat',
    tags: ['dayz','roblox','all games'],
    requirements: {
      'TPM': 'N/A',
      'Secure Boot': 'N/A',
      'Virtualization': 'N/A',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'DISABLED'
    },
    supportedWindows: 'ALL Windows versions\nDayZ: 25H2 & 24H2 NOT supported',
    otherRequirements: [
      'UEFI BIOS',
      'Visuals installed (*visual)',
      'Core Isolation OFF'
    ],
    fixes: [
      {
        title: 'Nvidia Overlay & Overwolf (AMD Users)',
        content: 'Disable Nvidia overlay and Overwolf for AMD users.'
      },
      {
        title: 'Roblox — Download via Fishstrap',
        content: 'Download the game from https://www.fishstrap.app to prevent silent beta updates that break the product.',
        links: ['https://www.fishstrap.app']
      }
    ]
  },
  {
    id: 'kraken-spoofer',
    name: 'Kraken Spoofer',
    category: 'Spoofer',
    tags: ['spoofer','all games'],
    requirements: {
      'TPM': 'N/A',
      'Secure Boot': 'N/A',
      'Virtualization': 'ENABLED',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'DISABLED'
    },
    supportedWindows: 'ALL Windows versions',
    otherRequirements: [
      'UEFI BIOS',
      'Visuals installed (*visual)',
      'Core Isolation OFF',
      '*defendercontrol'
    ],
    fixes: [
      {
        title: 'No Hardware Virtualization Capabilities Found / Hyper-V Running',
        content: 'Go to "Turn Windows Features On or Off" and disable Hyper-V.',
        commands: ['*cosmohyperv']
      },
      {
        title: 'Loader Stuck at 11%',
        content: 'Run in PowerShell as admin:',
        codeBlocks: ['Get-Volume | Where-Object DriveLetter | ForEach-Object { $drive = $_.DriveLetter; Write-Host "Running chkdsk on drive $drive"; chkdsk "$drive`:" /f /r }']
      }
    ]
  },
  {
    id: 'inferno',
    name: 'Inferno',
    category: 'Cheat',
    tags: ['all games'],
    requirements: {
      'TPM': 'N/A',
      'Secure Boot': 'N/A',
      'Virtualization': 'N/A',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'DISABLED'
    },
    supportedWindows: 'ALL Windows versions',
    otherRequirements: [
      'UEFI BIOS',
      'Visuals installed (*visual)',
      'Core Isolation OFF'
    ],
    fixes: [
      {
        title: 'Driver Initialization Error 1',
        content: 'Download and run this file, then restart your PC. Also disable Core Isolation and Vulnerable Driver Blocking in Windows Defender. If that doesn\'t help, click "Get Support" in the loader, select "Driver Error," and restart PC.',
        links: ['https://mega.nz/file/uURS0ZgL#gn9i_rBW__80V9uzexA_Cr2vPUPNGQK2aif4qtevXHs']
      }
    ]
  },
  {
    id: 'pulse',
    name: 'Pulse',
    category: 'Cheat',
    tags: ['arc raiders','all games'],
    requirements: {
      'TPM': 'N/A',
      'Secure Boot': 'DISABLED',
      'Virtualization': 'DISABLED',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'DISABLED'
    },
    supportedWindows: 'ALL Windows versions',
    otherRequirements: [
      'UEFI BIOS',
      'Visuals installed (*visual)',
      'Core Isolation OFF'
    ],
    fixes: [
      {
        title: 'Injection Failed (0x1394) — ARC Raiders',
        content: 'Close Chrome and try another browser (Opera recommended). If still not working:',
        codeBlocks: [
          '1. Download Overwolf: https://download.overwolf.com/install/Download?utm_content=new-light&utm_source=web_app_store',
          '2. Go to Task Manager → Startup apps → disable EVERYTHING. Restart PC.',
          '3. Ensure all game launchers are completely closed (EA/STEAM/BNET).',
          '4. Open Overwolf and disable all its overlays. Minimize to icon tray.',
          '5. Open loader as admin and inject.'
        ]
      }
    ]
  },
  {
    id: 'hero-valorant',
    name: 'Hero Valorant',
    category: 'Cheat',
    tags: ['valorant'],
    requirements: {
      'TPM': 'ENABLED',
      'Secure Boot': 'ENABLED',
      'Virtualization': 'ENABLED',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'DEFAULT'
    },
    supportedWindows: 'ALL Windows versions',
    otherRequirements: [
      'UEFI BIOS',
      '*visual',
      '*defendercontrol',
      '*coreisoval',
      'Medal.TV overlay',
      'GPU Drivers up to date',
      'HYPER-V ON (in Windows Features)'
    ],
    fixes: [
      {
        title: 'No Menu',
        content: 'Install Medal.TV and ensure "Record with Medal" is ON. Make sure Valorant Launcher is NOT open during inject.',
        commands: ['*coreisoval']
      },
      {
        title: 'Still No Menu — Generate bundle.enc',
        content: 'Download this tool, run it as admin. It will create a file named bundle.enc. Send it in the ticket and @ Seniors to forward to the developer.',
        links: ['https://gofile.io/d/sOW8lX']
      },
      {
        title: 'Secure Boot Policy Fix',
        content: 'Go to BIOS → Secure Boot → Key Management → reset/restore secure boot keys.'
      }
    ]
  },
  {
    id: 'hero-ow2',
    name: 'Hero OW2',
    category: 'Cheat',
    tags: ['overwatch 2','ow2'],
    requirements: {
      'TPM': 'N/A',
      'Secure Boot': 'N/A',
      'Virtualization': 'N/A',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'DISABLED'
    },
    supportedWindows: 'ALL Windows versions',
    otherRequirements: [
      'UEFI BIOS',
      '*visual',
      '*defendercontrol',
      'Core Isolation DISABLED',
      'Reputation-based protection OFF',
      'Exploit protection OFF',
      'GPU Drivers up to date',
      'Run loader as admin',
      'DISABLE ALL OVERLAYS',
      'Set DX11 in Overwatch 2'
    ],
    fixes: [
      {
        title: 'Latest Loader',
        content: 'Download from:',
        links: ['https://mega.nz/folder/VUdnFYCC#Y3MUZeXJl_vkQt5hjvgvXw']
      },
      {
        title: 'External Overlay Error Fix',
        content: 'Perform all of the following:\n1. Disable Discord overlay (Settings → Game Activity → Overlay toggle)\n2. Close OBS / switch from Game Capture to Window Capture\n3. Disable GeForce Experience overlay (Alt+Z → Settings → In-Game Overlay → Off)\n4. Disable Xbox Game Bar (Windows Settings → Gaming → Xbox Game Bar → Off)'
      },
      {
        title: 'Graphic Game Crash',
        content: 'Send the following 2 screenshots to support:',
        links: [
          'Graphics: https://imgur.com/a/Jf9L64C',
          'Overlay crash: https://imgur.com/a/ixjO37i'
        ]
      },
      {
        title: 'Aimbot or ESP Not Working',
        content: 'Select the default preset in the menu for aimbot. For ESP: Reload the cheat within the menu.'
      }
    ]
  },
  {
    id: 'hero-delta-force',
    name: 'Hero Delta Force',
    category: 'Cheat',
    tags: ['delta force'],
    requirements: {
      'TPM': 'N/A',
      'Secure Boot': 'ENABLED',
      'Virtualization': 'ENABLED',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'DISABLED'
    },
    supportedWindows: 'ALL Windows versions',
    otherRequirements: [
      'UEFI BIOS',
      'Visuals installed (*visual)',
      'Core Isolation OFF',
      '*defendercontrol',
      'Steam only — DX12 only'
    ],
    fixes: [
      {
        title: 'Before Injecting — Required Settings',
        content: 'In Delta Force, set display to WF/Borderless. Turn OFF Super Resolution/Upscaling.'
      },
      {
        title: 'Loader Crashes After Key Verification',
        content: 'Install the latest Microsoft Visual C++ Redistributable (both x86 and x64):',
        links: [
          'https://aka.ms/vs/17/release/vc_redist.x64.exe',
          'https://aka.ms/vs/17/release/vc_redist.x86.exe'
        ]
      },
      {
        title: 'Random Crashes / Freezes',
        content: 'Set the lowest graphics settings, set a stable FPS cap. Disable Super Resolution / DLSS / FSR.'
      },
      {
        title: 'No Menu — Generate bundle.enc',
        content: 'Download this tool, run as admin. It creates bundle.enc — send it in the ticket and @ Seniors.',
        links: ['https://gofile.io/d/sOW8lX']
      }
    ]
  },
  {
    id: 'hero-fn-rust-apex',
    name: 'Hero FN, Rust, Apex, ABI, ARC',
    category: 'Cheat',
    tags: ['fortnite','rust','apex','abi','arc raiders'],
    requirements: {
      'TPM': 'N/A',
      'Secure Boot': 'N/A',
      'Virtualization': 'N/A',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'DEFAULT'
    },
    supportedWindows: 'ALL Windows versions',
    otherRequirements: [
      'UEFI BIOS',
      'Visuals installed (*visual)',
      'Core Isolation OFF',
      'ALL NEED MEDAL.TV',
      'Hyper-V enabled for: ARC Raiders, Valorant, Fortnite and Apex'
    ],
    fixes: [
      {
        title: 'BSOD for Apex',
        content: 'Download from the link below. Ensure file path is: C:\\Program Files (x86)\\Windows Kits\\10\\ — Always generate a new build.',
        links: ['https://go.microsoft.com/fwlink/?linkid=2335869']
      },
      {
        title: 'Still No Menu or Errors — Generate bundle.enc',
        content: 'Download this tool, run as admin. It creates bundle.enc — send in ticket and @ Seniors.',
        links: ['https://gofile.io/d/sOW8lX']
      },
      {
        title: 'Arena Breakout (ENC: ON)',
        content: 'Too many reports — change account. It will go away after 12-24 hours.'
      },
      {
        title: 'Rust & FN Requirement',
        content: 'Install required package:',
        links: ['https://go.microsoft.com/fwlink/?linkid=2335869']
      }
    ]
  },
  {
    id: 'volt',
    name: 'VOLT',
    category: 'Cheat',
    tags: ['dayz','eft','rust','all games'],
    requirements: {
      'TPM': 'DISABLED',
      'Secure Boot': 'DISABLED',
      'Virtualization': 'ENABLED',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'DISABLED'
    },
    supportedWindows: 'ALL Windows versions',
    otherRequirements: [
      'UEFI BIOS',
      'Visuals installed (*visual)',
      'Core Isolation OFF',
      '*pin removed for TPM',
      'HVIX & HVAX in system32 (usually only removed if user used Kane before)'
    ],
    fixes: [
      {
        title: 'Framework Error',
        content: 'Install .NET Runtime (both x64 and x86):',
        links: [
          'https://builds.dotnet.microsoft.com/dotnet/Runtime/7.0.5/dotnet-runtime-7.0.5-win-x64.exe',
          'https://builds.dotnet.microsoft.com/dotnet/Runtime/7.0.5/dotnet-runtime-7.0.5-win-x86.exe'
        ]
      },
      {
        title: 'No ESP — DayZ & EFT',
        content: 'DayZ: Settings → Video → Disable "POSTPROCESS ANTIALIASING" & "HARDWARE ANTIALIASING"\nEFT: Settings → Game → Find "Autoclean RAM" and disable it.'
      },
      {
        title: 'Keybinds for Rust Lite',
        content: 'F5 for ESP, F6 for no recoil, F9 for remove walls.'
      },
      {
        title: 'Legacy BIOS / Boot Partition Not GPT',
        content: 'Follow this tutorial:',
        links: ['https://youtu.be/a54sqzcDrUU?si=Lj2PE-bUK2bLBMEg']
      },
      {
        title: 'Errors Requiring Windows Reinstall',
        content: 'Error 1, 3, 4, 5, 6, 7 (all related to boot partitions).'
      },
      {
        title: 'HVIX/HVAX Not Found',
        content: 'Run sfc /scannow in CMD as admin.',
        codeBlocks: ['sfc /scannow']
      }
    ]
  },
  {
    id: 'vex',
    name: 'VEX',
    category: 'Cheat',
    tags: ['warthunder','all games'],
    requirements: {
      'TPM': 'N/A',
      'Secure Boot': 'DISABLED',
      'Virtualization': 'DISABLED',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'DISABLED'
    },
    supportedWindows: 'Windows 10 22H2 → Windows 11 23H2',
    otherRequirements: [
      'UEFI BIOS',
      'Visuals installed (*visual)',
      'Core Isolation OFF',
      '*defendercontrol'
    ],
    fixes: [
      {
        title: 'VEX Warthunder',
        content: 'Must be run in DX11. Add -D3D11 to launch parameters.'
      },
      {
        title: 'Connection Issue',
        content: 'Download and run the network manager tool:',
        codeBlocks: [
          '1. Download: https://pcheck.ru/files/networkmanager.zip',
          '2. Run it.',
          '3. Select "Find the Best IP" option.',
          '4. Wait for the check to complete.',
          '5. Click "Apply".'
        ],
        links: ['https://pcheck.ru/files/networkmanager.zip']
      }
    ]
  },
  {
    id: 'crown',
    name: 'Crown',
    category: 'Cheat',
    tags: ['cod','marvels','all games'],
    requirements: {
      'TPM': 'DISABLED (except COD)',
      'Secure Boot': 'DISABLED (except COD)',
      'Virtualization': 'N/A',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'DISABLED'
    },
    supportedWindows: 'ALL Windows versions',
    otherRequirements: [
      'UEFI BIOS',
      'Visuals installed (*visual)',
      'Core Isolation OFF',
      '*defendercontrol'
    ],
    fixes: [
      {
        title: 'Marvels Fix',
        content: 'Run Notepad as admin BEFORE injecting the cheat.'
      },
      {
        title: 'Marvels 25H2',
        content: 'Unstable on 25H2 — warn the customer.'
      }
    ]
  },
  {
    id: 'opal-fivem',
    name: 'Opal (FiveM)',
    category: 'Cheat',
    tags: ['fivem','gta'],
    requirements: {
      'TPM': 'N/A',
      'Secure Boot': 'N/A',
      'Virtualization': 'N/A',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'DISABLED'
    },
    supportedWindows: 'ALL Windows versions',
    otherRequirements: [
      'UEFI BIOS',
      'Visuals installed (*visual)',
      'Core Isolation OFF',
      '*defendercontrol',
      'Steam overlay ENABLED',
      'FiveM version — Release'
    ],
    fixes: [
      {
        title: 'Injection Error 1–4',
        content: 'Error 1-4: Download/Timeout Error → Use a VPN\nError 2: Integrity Error → Reinstall FiveM\nError 3: Injection Error → Anti-cheats/Anti-virus blocking injection'
      },
      {
        title: 'Cheat Issues — Display Settings',
        content: 'Display must NOT be Fullscreen Exclusive (causes crashes). Steam must be open with Steam overlay enabled.'
      },
      {
        title: 'How to Inject',
        content: 'Open FiveM with Steam running in background → Open loader and log in with key → Inject the cheat. Users can also inject inside a server (Open game → Join server → Inject).'
      }
    ]
  },
  {
    id: 'opal-other',
    name: 'Opal (except FiveM)',
    category: 'Cheat',
    tags: ['all games','spoofer'],
    requirements: {
      'TPM': 'N/A',
      'Secure Boot': 'N/A',
      'Virtualization': 'N/A',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'DISABLED'
    },
    supportedWindows: 'ALL Windows versions',
    otherRequirements: [
      'UEFI BIOS',
      'Visuals installed (*visual)',
      'Core Isolation OFF',
      '*defendercontrol'
    ],
    fixes: [
      {
        title: 'Fatal Error — Connection Error',
        content: 'Open Date and Time Settings and sync your PC time.'
      },
      {
        title: 'BSOD',
        content: 'Disable all anti-virus using:',
        links: ['https://antivirus-removal-tool.com/'],
        codeBlocks: ['If issue persists, uninstall mouse/keyboard software (Razer, Armory Crate).']
      },
      {
        title: '2 Beeps When Pressing F2 & Game Crashes',
        content: 'Remove all modifications including Reshade/Redux. Reinstall the game with Revo-Uninstaller if issue persists.'
      },
      {
        title: 'Status 502 — Internal Server Error',
        content: 'Server is down. Switch servers:\n1. Create a shortcut of the loader on your desktop\n2. Open Properties → in the Target line, add at the end: –diagnostic\n3. Reopen the shortcut loader → select a different server → try again.'
      }
    ]
  },
  {
    id: 'viper',
    name: 'Viper',
    category: 'Cheat',
    tags: ['all games','arc raiders','steam'],
    requirements: {
      'TPM': 'N/A',
      'Secure Boot': 'N/A',
      'Virtualization': 'N/A',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'Use Default'
    },
    supportedWindows: 'ALL Windows versions',
    otherRequirements: [
      'ALL ANTI-VIRUS OFF (use *defendercontrol)',
      'Windows Defender, SmartScreen, Core Isolation disabled',
      'Disable ALL overlays (Discord, Nvidia, Overwolf, Reshade, RivaTuner)',
      'Must run Steam as admin — NO launch parameters',
      'Disable Frame Generation and Nvidia Reflex in games that support it',
      'No Nvidia filters',
      'STEAM ONLY (except ARC Raiders)',
      'Close background apps / disable in startup',
      'Visuals installed (*visual)',
      'Windows up to date',
      'GPU drivers up to date'
    ],
    fixes: [
      {
        title: 'Failed to Stream — Check Connection',
        content: 'Use a VPN.'
      },
      {
        title: 'Extra Step — The Isle Evrima',
        content: 'Delete: %localappdata%\\TheIsle\\Saved folder.',
        codeBlocks: ['%localappdata%\\TheIsle\\Saved']
      },
      {
        title: 'Extra Step — ARC Raiders',
        content: 'Delete: %localappdata%\\PioneerGame\\Saved folder.',
        codeBlocks: ['%localappdata%\\PioneerGame\\Saved']
      },
      {
        title: 'Troubleshoot Tool',
        content: 'Run the troubleshoot tool:',
        links: ['https://cdn.discordapp.com/attachments/1459056826317537397/1460873272760602848/Troubleshoot.exe']
      },
      {
        title: 'Failed to Stream — Set DNS',
        content: 'Set DNS to Cloudflare (1.1.1.1).'
      }
    ]
  },
  {
    id: 'breeze',
    name: 'Breeze',
    category: 'Cheat',
    tags: ['ark','r6','siege','spoofer'],
    requirements: {
      'TPM': 'N/A',
      'Secure Boot': 'N/A',
      'Virtualization': 'N/A',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'DISABLED'
    },
    supportedWindows: 'ALL Windows versions',
    otherRequirements: [
      'Reputation-based protection OFF',
      'Core Isolation OFF',
      'Exploit protection OFF (use *defendercontrol)',
      'ARK: Steam/Epic only',
      'Visuals installed (*visual)',
      'GPU drivers up to date'
    ],
    fixes: [
      {
        title: 'Overlay for ARK',
        content: 'Use Legacy Discord overlay (enable overlay OFF).'
      },
      {
        title: 'Overlay for R6',
        content: 'Use Nvidia or AMD Metrics Overlay.'
      },
      {
        title: 'Loader Not Opening',
        content: 'Sync PC time and use Warp VPN. Also check installed programs for anti-virus.'
      },
      {
        title: 'Windows 11 Fix for Spoofer',
        content: 'All Windows 11 users must run this to avoid BSOD:\nExtract the file, run as admin, click Yes to all. Restart PC then clean/spoof.',
        links: ['https://gofile.io/d/qVXmXC']
      },
      {
        title: 'For Spoofer — Delete Last 2 Windows Security Updates',
        content: 'Windows Update → Update History → Uninstall Updates → Look for Security Updates → Uninstall the last 2.'
      }
    ]
  },
  {
    id: 'vortex',
    name: 'Vortex',
    category: 'Cheat',
    tags: ['valorant','all games'],
    requirements: {
      'TPM': 'N/A (ON for games that require it)',
      'Secure Boot': 'DISABLED',
      'Virtualization': 'ENABLED',
      'Windows Defender': 'DISABLED',
      'Windows Firewall': 'DISABLED',
      'Exploit Protection': 'DISABLED'
    },
    supportedWindows: 'ALL Windows versions',
    otherRequirements: [
      '*visual for all visuals',
      'Hyper-V enabled in Windows Features',
      'BIOS: UEFI & Disks GPT',
      'All anti-virus uninstalled (VGK, FaceIT, McAfee etc.)',
      'Core Isolation DISABLED'
    ],
    fixes: [
      {
        title: 'InitWindows Error!',
        content: 'Press F2 for injector ONLY AFTER you see the Discord overlay banner. DO NOT be in a Discord call when using Discord overlay. Disable Legacy overlay.'
      },
      {
        title: 'LoadHyperVisor Error!',
        content: 'Hypervisor not loaded properly. Follow this video:',
        links: ['https://youtu.be/XYVeHy5u4j4']
      },
      {
        title: 'Error! Craft UEFI',
        content: 'Try making a partition (GPT) in Disk Management and boot from there. If not working, reinstall Windows.'
      },
      {
        title: 'Blackscreen Initialization',
        content: 'Disable TPM and re-check all HyperVisor setup. Follow YT Link above.'
      },
      {
        title: 'Bad Image Libs',
        content: 'Replace the following files from the loader folder into C:\\Windows\\System32 AND C:\\Windows\\INF:\n- libcrypto-1_1-x64.dll\n- libssl-1_1-x64.dll',
        codeBlocks: ['Copy libcrypto-1_1-x64.dll and libssl-1_1-x64.dll to:\nC:\\Windows\\System32\nC:\\Windows\\INF']
      },
      {
        title: 'Secure Boot Bypass — Valorant Fix',
        content: 'Follow these steps:',
        links: ['https://gofile.io/d/JPNqIp'],
        codeBlocks: [
          '1. WBCL.dat → drop in C:\\Windows\\System32',
          '2. Run Start.exe as Admin',
          '3. Run Secure Boot Fix.bat'
        ]
      },
      {
        title: 'Unsupported 16-Bit Application',
        content: 'Take a screenshot confirming:\n- Windows Defender Real-time Protection is DISABLED\n- All third-party anti-virus REMOVED\n- Firewall completely disabled\n- No YouTube/Discord bypasses interfering with loader\n- Use VPN for launching'
      }
    ]
  },
  {
    id: 'extra-fixes-kane',
    name: 'Extra Fixes — Kane',
    category: 'Extra Fixes',
    tags: ['kane','fixes'],
    requirements: {},
    supportedWindows: '',
    otherRequirements: [],
    fixes: [
      {
        title: 'No Available Servers Were Found',
        content: 'Use a VPN.'
      },
      {
        title: 'CRD Failed at 199 with Code 887a0001',
        content: 'Try disabling the integrated GPU. If that doesn\'t work, or the customer has no other GPU, issue a refund.'
      },
      {
        title: 'Required Resource Not Found',
        content: 'Start the cheat AFTER the spoofer.'
      },
      {
        title: 'Failed to Prepare Environment (1)',
        content: 'Restart PC and try again.'
      },
      {
        title: 'Error 0x298',
        content: 'Contact developer.'
      },
      {
        title: 'Failed to Inject the Cheat (12)',
        content: 'Try pressing OK and entering the game to see if it works.'
      }
    ]
  },
  {
    id: 'extra-rare-fixes',
    name: 'Extra Rare Fixes',
    category: 'Extra Fixes',
    tags: ['cosmo','rust'],
    requirements: {},
    supportedWindows: '',
    otherRequirements: [],
    fixes: [
      {
        title: 'Cosmo Rust — Occlusion Culling',
        content: 'Turn OFF Occlusion Culling in Experimental settings for COSMO RUST.'
      }
    ]
  },
  {
    id: 'tos-refunds',
    name: 'T.O.S. / Refunds / Compensation / HWID Reset',
    category: 'Policy',
    tags: ['tos','refund','hwid','compensation'],
    requirements: {},
    supportedWindows: '',
    otherRequirements: [],
    fixes: [
      {
        title: 'Refunds — Required Information',
        content: 'When processing a refund, ask for: Key, Order Number, Key Length, and Game.'
      },
      {
        title: 'Eligible Refund Reasons',
        content: '• Instant ban without being able to use the product (verify user wasn\'t banned before or double-injected).\n• Corrupted PC caused by the product (some developers have fixes, so no refund in those cases).'
      },
      {
        title: 'Product Updating',
        content: 'If a product has been updating for a while and users ask for refunds, tell them to wait. If a massive number of users make tickets and the product has been down for a very long time, refunds may be considered in some cases.'
      },
      {
        title: 'Downgrading',
        content: 'We can refund some products if user doesn\'t want to downgrade, but preferably convince them to downgrade. Suggest backing up important files with OneDrive or a USB. If user continues to request a refund, @ a Senior Support. You can always ask a senior if you can refund.'
      },
      {
        title: 'Compensation',
        content: 'Compensation may be provided in some cases. Always ask a Senior Support for approval.'
      },
      {
        title: 'HWID Reset',
        content: 'HWID Resets are handled by Senior Support or the developer. Escalate these cases.'
      }
    ]
  }
];

if (typeof module !== 'undefined') module.exports = PRODUCTS;
