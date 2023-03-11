export interface ProjectType {
	_id?: string;
	title: string;
	body: string;
	github: string;
	liveSite: string;
	deskImgUrl?: string;
	tabletImgUrl?: string;
	mobileImgUrl?: string;
	techSelected: string[];
	alignLeft: boolean;
	featured: boolean;
	article?: boolean;
}
