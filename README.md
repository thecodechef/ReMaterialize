# ReMaterialize

This theme brings the [Material Design](http://www.google.com/design/) visual language to your Sublime Text 3. If you have problems, first search for a similiar issue and then report with [new one](https://github.com/thecodechef/ReMaterialize/issues/new).

Please read the [Known Issues](https://github.com/thecodechef/ReMaterialize#known-issues) section before reporting a new one.

## Easy installation
You can install this awesome theme through the [Package Control](https://packagecontrol.io/installation).

1. Press <kbd>cmd/ctrl</kbd> + <kbd>shift</kbd> + <kbd>p</kbd> to open the command palette.
2. Type *"install package"* and press enter. Then search for *"ReMaterialize"*


## Manual installation

1. Download the [latest release](https://github.com/thecodechef/ReMaterialize/releases/latest), extract and rename the directory to **"ReMaterialize"**.
2. Move the directory inside your sublime `Packages` directory. **(Preferences > Browse packages...)**

## Activate the theme

1. Open you preferences **(Preferences > Setting - User)** and add this lines:

```json
"theme": "ReMaterialize.sublime-theme",
"color_scheme": "Packages/ReMaterialize/schemes/ReMaterialize.tmTheme",
```

**NOTE:** Restart Sublime Text after activating the theme.

## Theme styles

### Default
```json
"theme": "ReMaterialize.sublime-theme",
"color_scheme": "Packages/ReMaterialize/schemes/ReMaterialize.tmTheme",
```

### Darker
```json
"theme": "ReMaterialize-Darker.sublime-theme",
"color_scheme": "Packages/ReMaterialize/schemes/ReMaterialize-Darker.tmTheme",
```

### Lighter
```json
"theme": "ReMaterialize-Lighter.sublime-theme",
"color_scheme": "Packages/ReMaterialize/schemes/ReMaterialize-Lighter.tmTheme",
```

### Zenburn
```json
"theme": "ReMaterialize-Zenburn.sublime-theme",
"color_scheme": "Packages/ReMaterialize/schemes/ReMaterialize-Zenburn.tmTheme",
```

**More Styles on Horizon**

## Known issues
Please see the issue [#67](https://github.com/equinusocio/material-theme/issues/67) if you can't see the bottom panel (find/replace, rename, move, can't see the box inputs in SidebarEnhancement, etc..). here the quick fix:

![Drag the top edge](https://cloud.githubusercontent.com/assets/474329/8178894/a0dd09c0-1412-11e5-8ecf-f7f9ade439ae.gif)

## Theme options

```json
"rematerialize_small_tab"                : true , // Set small tabs
"rematerialize_disable_fileicons"        : true , // Hide sidebar file type icons
"rematerialize_disable_folder_animation" : true , // Disable folder animation
"rematerialize_small_statusbar"          : true , // Set small status bar
"rematerialize_compact_sidebar"          : true , // Set compact side bar
"rematerialize_compact_panel"            : true , // Set minimal padding for the search panel
"rematerialize_disable_tree_indicator"   : true , // Disable sidebar file indicator
"rematerialize_bold_tab"                 : true , // Make the tab labels bolder
"rematerialize_tabs_separator"           : true , // Show tabs separator, this disables tab hover animation
"rematerialize_accent_lime"              : true , // set green lime accent color
"rematerialize_accent_purple"            : true , // set purple accent color
"rematerialize_accent_red"               : true , // set pale red accent color
"rematerialize_accent_orange"            : true , // set orange accent color
"rematerialize_accent_yellow"            : true , // set yellow accent color
"rematerialize_accent_indigo"            : true , // set indigo accent color
"rematerialize_accent_pink"              : true , // set pink accent color
"rematerialize_accent_blue"              : true , // set blue accent color
"rematerialize_accent_cyan"              : true , // set cyan accent color
"rematerialize_appbar_lime"              : true , // set green lime accent color
"rematerialize_appbar_purple"            : true , // set purple accent color
"rematerialize_appbar_red"               : true , // set pale red accent color
"rematerialize_appbar_orange"            : true , // set orange accent color
"rematerialize_appbar_yellow"            : true , // set yellow accent color
"rematerialize_appbar_indigo"            : true , // set indigo accent color
"rematerialize_appbar_pink"              : true , // set pink accent color
"rematerialize_appbar_blue"              : true , // set blue accent color
"rematerialize_appbar_cyan"              : true , // set cyan accent color
"rematerialize_appbar_dark_text_tabs"    : true , // set dark text color on tabs
"rematerialize_white_panels"             : true , // show white panels
"rematerialize_panel_separator"          : true , // show bottom panel separator
"rematerialize_tabs_autowidth"           : true , // Enable autowidth for tabs
"rematerialize_contrast_mode"            : true , // Enable sidebar and panels contrast mode
```

## Recommended settings for a better experience:

```json
"overlay_scroll_bars"          : "enabled",
"line_padding_top"             : 3,
"line_padding_bottom"          : 3,
"always_show_minimap_viewport" : true,
"bold_folder_labels"           : true,
"indent_guide_options"         : [ "draw_normal", "draw_active" ],   // Highlight active indent
"font_options"                 : [ "gray_antialias", "subpixel_antialias" ],    // On retina Mac & Windows
```

The font used for the code is "[Operator Mono](http://www.typography.com/blog/introducing-operator)"

You can also use the official Material Design monospace font "[Roboto Mono](https://www.google.com/fonts/specimen/Roboto+Mono)" or "[Fira Code](https://github.com/tonsky/FiraCode)".

## Contributing

This UI theme use a custom compiler build on Gulp and JS. If you want to edit the UI you must first install the compiler:

```
$ npm install
```
then run compiler and watcher by run:

```
$ gulp
```
You can now edit the source files under `/.src` folder that will be compiled inside the root folder (don't edit compiled files.)

## Other Resources

**App icon**

[Download](https://dribbble.com/shots/2104476-Material-Theme-for-Sublime-Text-3/attachments/380650) the official Material Theme icon.

## Color Schemes palettes

Color             | Default / Darker |  Lighter   |
---               | ---              |  ---       |
Red               | `#FF5370`        |  `#E53935` |
Pink              | `#f07178`        |  `#FF5370` |
Orange            | `#F78C6C`        |  `#F76D47` |
Yellow            | `#FFCB6B`        |  `#FFC000` |
Green             | `#C3E88D`        |  `#91B859` |
Pale Blue         | `#B2CCD6`        |  `#8796B0` |
Cyan              | `#89DDFF`        |  `#39ADB5` |
Blue              | `#82AAFF`        |  `#6182B8` |
Purple            | `#C792EA`        |  `#7C4DFF` |
Violet            | `#bb80b3`        |  `#945EB8` |
Brown             | `#ab7967`        |  `#ab7967` |

### Thanks
Thanks for all the [contributors](https://github.com/equinusocio/material-theme/graphs/contributors).

Check the video review by **LevelUpTuts**

## Video review
[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/6eqgrCxprOI/0.jpg)](http://www.youtube.com/watch?v=6eqgrCxprOI)