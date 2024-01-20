const SidebarData = [
  {
    label: "Menu",
    isMainMenu: true,
  },
  {
    label: "Dashboard",
    icon: "mdi mdi-home-variant-outline",
    url: "/dashboard",
    issubMenubadge: true,
    bgcolor: "bg-primary",
    badgeValue: "3",
  },
  // {
  //   label: "Calendar",
  //   icon: "mdi mdi-calendar-outline",
  //   isHasArrow: true,
  //   url: "/calendar",
  // },
  {
    label: "Automatización",
    icon: "mdi mdi-cogs",
    isHasArrow: true,
    url: "/automation",
  },
  {
    label: "Campañas",
    icon: "mdi mdi-account-group-outline",
    isHasArrow: true,
    url: "/campaigns",
  },
  {
    label: "Leads",
    icon: "mdi mdi-account-convert-outline",
    isHasArrow: true,
    url: "/leads",
  },
  {
    label: "Email templates",
    icon: "mdi mdi-email-plus-outline",
    isHasArrow: true,
    url: "/email-templates",
  },
  {
    label: "Landing templates",
    icon: "dripicons-device-desktop",
    isHasArrow: true,
    url: "/landing-templates",
  },
  {
    label: "Validación emails",
    icon: "mdi-email-check",
    isHasArrow: true,
    url: "/email-validation",
  },
  {
    label: "AI",
    isMainMenu: true,
  },
  {
    label: "Chatbot Builder",
    icon: "mdi mdi-robot",
    isHasArrow: true,
    url: "/dashboard/bot-builder",
  },
  // {
  //   label: "Email",
  //   icon: "mdi mdi-email-outline",
  //   subItem: [
  //     { sublabel: "Inbox", link: "/inbox" },
  //     { sublabel: "Read Email", link: "/read-email" },
  //     { sublabel: "Email Compose", link: "/compose-email" },
  //   ],
  // },
  // {
  //   label: "Pages",
  //   isMainMenu: true,
  // },

  // {
  //   label: "Components",
  //   isMainMenu: true,
  // },
  // {
  //   label: "UI Elements",
  //   icon: "mdi mdi-briefcase-variant-outline",
  //   subItem: [
  //     { sublabel: "Alerts", link: "/ui-alerts" },
  //     { sublabel: "Badge", link: "/ui-badge" },
  //     { sublabel: "Breadcrumb", link: "/ui-breadcrumb" },
  //     { sublabel: "Buttons", link: "/ui-buttons" },
  //     { sublabel: "Cards", link: "/ui-cards" },
  //     { sublabel: "Carousel", link: "/ui-carousel" },
  //     { sublabel: "Dropdowns", link: "/ui-dropdowns" },
  //     { sublabel: "Grid", link: "/ui-grid" },
  //     { sublabel: "Images", link: "/ui-images" },
  //     { sublabel: "Lightbox", link: "/ui-lightbox" },
  //     { sublabel: "Modals", link: "/ui-modals" },
  //     { sublabel: "Offcanvas", link: "/ui-offcanvas" },
  //     { sublabel: "Range Slider", link: "/ui-rangeslider" },
  //     { sublabel: "Session Timeout", link: "/ui-sessiontimeout" },
  //     { sublabel: "Pagination", link: "/ui-pagination" },
  //     { sublabel: "Progress Bars", link: "/ui-progressbars" },
  //     { sublabel: "Placeholders", link: "/ui-placeholders" },
  //     { sublabel: "Tabs & Accordions", link: "/ui-tabs-accordions" },
  //     { sublabel: "Typography", link: "/ui-typography" },
  //     { sublabel: "Toasts", link: "/ui-toasts" },
  //     { sublabel: "Video", link: "/ui-video" },
  //     { sublabel: "Popovers & Tooltips", link: "/ui-popovers" },
  //     { sublabel: "Rating", link: "/ui-rating" },
  //   ],
  // },
  // {
  //   label: "Forms",
  //   icon: "ri-eraser-fill",
  //   issubMenubadge: true,
  //   bgcolor: "bg-danger",
  //   badgeValue: "8",
  //   subItem: [
  //     { sublabel: "Form Elements", link: "/form-elements" },
  //     { sublabel: "Form Validation", link: "/form-validation" },
  //     { sublabel: "Form Advanced Plugins", link: "/form-advanced" },
  //     { sublabel: "Form Editor", link: "/form-editor" },
  //     { sublabel: "Form File Upload", link: "/form-uploads" },
  //     { sublabel: "Form X-editable", link: "/form-editors" },
  //     { sublabel: "Form Wizard", link: "/form-wizard" },
  //     { sublabel: "Form Mask", link: "/form-mask" },
  //   ],
  // },
  // {
  //   label: "Tables",
  //   icon: "ri-table-2",
  //   subItem: [
  //     { sublabel: "Basic Tables", link: "/tables-basic" },
  //     { sublabel: "List Js", link: "/tables-listjs" },
  //     { sublabel: "React Datatables", link: "/table-datatables" },
  //   ],
  // },
  // {
  //   label: "Charts",
  //   icon: "ri-bar-chart-line",
  //   subItem: [
  //     { sublabel: "Apex Charts", link: "/chart-apexcharts" },
  //     { sublabel: "Chartjs Charts", link: "/chart-chartjscharts" },
  //     { sublabel: "Re Charts", link: "/chart-floatcharts" },
  //     { sublabel: "Knob Charts", link: "/chart-jknobcharts" },
  //     { sublabel: "Sparkline Charts", link: "/chart-sparklinecharts" },
  //   ],
  // },
  {
    label: "Icons",
    icon: "ri-brush-line",
    subItem: [
      { sublabel: "Box Icons", link: "/icon-boxicon" },
      { sublabel: "Material Design", link: "/icons-materialdesign" },
      { sublabel: "Dripicons", link: "/icon-dripicons" },
      { sublabel: "Font Awesome", link: "/icons-fontawesome" },
    ],
  },
  // {
  //   label: "Maps",
  //   icon: "ri-map-pin-line",
  //   subItem: [
  //     { sublabel: "Google Maps", link: "/maps-google" },
  //     { sublabel: "Vector Maps", link: "/maps-vector" },
  //   ],
  // },
  // {
  //   label: "Multi Level",
  //   icon: "ri-share-line",
  //   subItem: [
  //     { sublabel: "Level 1.1", link: "/#" },
  //     {
  //       sublabel: "Level 1.2",
  //       link: "/#",
  //       subMenu: [{ title: "Level 2.1" }, { title: "Level 2.2" }],
  //     },
  //   ],
  // },
];
export default SidebarData;
