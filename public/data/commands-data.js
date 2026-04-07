const COMMANDS = [
  {
    category: 'Visual & Setup',
    icon: '🖥️',
    items: [
      {
        command: '*visual',
        description: 'Installs the required visual C++ redistributables and runtime components needed by all products.',
        usage: 'Send in ticket to customer before product setup.',
        products: ['All Products']
      },
      {
        command: '*defendercontrol',
        description: 'Sends the Defender Control tool to disable Windows Defender, Windows Firewall, and related security features.',
        usage: 'Use when customer needs to disable all Windows security.',
        products: ['All Products']
      },
      {
        command: '*coreisoval',
        description: 'Sends the Core Isolation disable fix specifically for Valorant users.',
        usage: 'Use when Hero Valorant requires Core Isolation to be disabled.',
        products: ['Hero Valorant']
      }
    ]
  },
  {
    category: 'Hyper-V & Virtualization',
    icon: '⚙️',
    items: [
      {
        command: '*cosmohyperv',
        description: 'Sends the Hyper-V fix command for Cosmo products. Disables Hyper-V properly when it causes errors.',
        usage: 'Use when customer reports Hyper-V error on Cosmo (Naxo) or Cosmo Pro.',
        products: ['Cosmo (Naxo)', 'Cosmo Pro']
      },
      {
        command: '*iobit',
        description: 'Sends the IOBit Uninstaller command to help remove problematic software or apply SVM/VMX fix steps.',
        usage: 'Use after *pin command for SVM/VMX errors on Kane or Liquid.',
        products: ['Kane', 'Liquid']
      }
    ]
  },
  {
    category: 'System Fixes',
    icon: '🔧',
    items: [
      {
        command: '*pin',
        description: 'Sends instructions to disable the Windows PIN, which can interfere with virtualization settings.',
        usage: 'Use before *iobit when customer has SVM/VMX errors.',
        products: ['Kane', 'Liquid', 'VOLT']
      },
      {
        command: '*delay',
        description: 'Sends the delay file for ProAim that fixes BSOD issues when used with the loader.',
        usage: 'Use when customer still has BSOD after using the latest ProAim loader.',
        products: ['ProAim']
      },
      {
        command: '*kaneamdmenufix',
        description: 'Sends the AMD menu fix for Kane — resolves "Please download and install the latest vc_redist libs" error.',
        usage: 'Use when Kane shows vc_redist error on AMD systems.',
        products: ['Kane']
      }
    ]
  },
  {
    category: 'Escalation & Tickets',
    icon: '🎟️',
    items: [
      {
        command: '*naxoticket',
        description: 'Adds Naxo (the developer) directly to the ticket for issues that support staff cannot resolve.',
        usage: 'Use as a last resort when standard Cosmo (Naxo) fixes fail.',
        products: ['Cosmo (Naxo)']
      }
    ]
  }
];

const BOT_LINKS = {
  commandsPage: 'https://gorgeborger2-byte.github.io/cosmo-support/commands.html',
  statusPage: 'https://support.cosmotickets.com/status/',
  supportSite: 'https://support.cosmotickets.com/'
};

if (typeof module !== 'undefined') { module.exports = { COMMANDS, BOT_LINKS }; }
