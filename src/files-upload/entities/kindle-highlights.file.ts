import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Users} from "../../users/entities/users.entity";
import {HighlightsInterface} from "../interfaces/highlights-interface";

@Entity()
export default class KindleHighlightsFile {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Users, (user) => user.userKindleFileUploads, {eager: true})
    @JoinColumn({name: 'user_id'})
    userId: Users;

    @CreateDateColumn({nullable: false})
    uploadDate?: Date;

    @Column({type: 'jsonb', nullable: false, name: 'file'})
    highlights: {
        highlights: HighlightsInterface[];
        exceptions: string[]
    };
}
