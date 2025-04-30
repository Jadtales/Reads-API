interface NoteComment {
  commentId: string;
  commentedByUserId: string;
  commentContent: string;
  commentReplies: NoteComment[];
}

export interface NoteCommentsId {
  noteId: string;
  noteByUserId: string;
  noteComments?: NoteComment[];
}
