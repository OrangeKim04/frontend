export interface Post {
   boardId: number;
   title: string;
   content: string;
   likeCount: number;
   commentCount: number;
   name?: string;
   createdDate: string;
   liked: boolean;
}

export interface PostDetail extends Post {
   liked: boolean;
   comments: Comment[];
   postImage: string;
   nickname: string;
}

export interface Comment {
   id: string;
   content: string;
   username: string;
   createdAt: string;
   replies: Comment[];
}
