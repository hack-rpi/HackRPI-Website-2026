export interface Link {
	href: string;
	children: React.ReactNode;
	new_tab: boolean;
}

export interface NavGroup {
	name: string;
	links: Link[];
}