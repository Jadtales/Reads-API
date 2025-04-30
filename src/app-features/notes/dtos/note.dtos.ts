import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID
} from "class-validator";

import { PickType } from "@nestjs/mapped-types";

export class PostNoteDTO {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  noteContent: string;

  @IsString()
  @IsOptional()
  contentType?: "Note" | "Page" = "Note";

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsArray()
  @IsOptional()
  mentionedBooks?: string[];

  @IsArray()
  @IsOptional()
  @IsUUID(undefined, { each: true })
  mentionedUsers?: string[];
}

export class LikeNoteDTO {
  @IsString()
  @IsNotEmpty()
  noteId: string;

  @IsString()
  @IsNotEmpty()
  likedByUserId: string;
}

export class CommentNoteDTO extends PickType(LikeNoteDTO, ["noteId"] as const) {
  @IsString()
  @IsNotEmpty()
  commentedByUserId: string;

  @IsString()
  @IsNotEmpty()
  commentContent: string;
}