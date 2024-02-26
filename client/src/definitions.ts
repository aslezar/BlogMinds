export interface BlogShortType {
	_id: number;
	title: string;
	description: string;
	author: string;
	img: string;
}

export interface BlogFullType {
	_id: string;
	// Add other fields from the "Blog" schema as needed
}

interface ProfileImage {
	data: Buffer;
	contentType: string;
}

interface User {
	name: string;
	email: string;
	password: string;
	bio?: string;
	profileImage?: ProfileImage;
}

export interface UserDocumentType extends User {
	_id: string;
	createdAt: string;
	updatedAt: string;
	blogs?: BlogFullType[];
}
