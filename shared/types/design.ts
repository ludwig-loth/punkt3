export interface ElementDimensions {
    width: number;
    height: number;
    top: number;
    left: number;
}

export interface LandingPageDesign {
    opening_line: ElementDimensions;
    about_me: ElementDimensions;
    menu_items: ElementDimensions;
}

export interface SidebarDesign {
    section_heading: ElementDimensions;
    section_content: ElementDimensions;
}