import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  bookName: string;

  @Column({ type: 'varchar', length: 255 })
  bookAuthor: string;

  @Column({ type: 'text', nullable: true })
  bookDescription: string;

  @Column({ type: 'decimal', default: 0 })
  bookRating: number;

  @Column({ type: 'decimal', default: 0 })
  bookReanotesRating: number;

  @UpdateDateColumn()
  lastUpdate: Date; // updated when entity is updated.

  @Column({ type: 'varchar', length: 255 })
  bookCover: string;

  @Column({ type: 'timestamp', length: 255 })
  bookReleaseDate: Date;

  @Column({ type: 'text', length: 255, array: true, nullable: true })
  bookGenres: string[];

  @Column({ type: 'text', length: 255, array: true, nullable: true })
  bookThemes: string[];
}
