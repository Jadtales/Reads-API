import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Users} from "../../users/entities/user.entity";

@Entity()
export default class UploadKindleFile {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Users, (user) => user.userKindleFileUploads, {eager: true})
    @JoinColumn({name: 'user_id'})
    userId: Users;

    @CreateDateColumn({nullable: false})
    uploadDate: Date;

    @Column({type: 'jsonb', nullable: false, name: 'file'})
    extractedHighlightsFromFile: {
        bookAuthor: string,
        bookTitle: string,
        pageLocation: string,
        addedDate: string,

        highlights: {
            term: string | null;
            definition: string | null;
            isStared: boolean;
        }[];
    };
}
