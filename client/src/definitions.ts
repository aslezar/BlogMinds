interface Blog {
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
	blogs?: Blog[];
}

// Assuming you have a separate file for the interfaces
export interface UserDocument extends User {
	_id: string;
	createdAt: string;
	updatedAt: string;
	blogs?: Blog[];
}
