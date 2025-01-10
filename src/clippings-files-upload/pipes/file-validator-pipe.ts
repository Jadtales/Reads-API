import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";

@Injectable()
export default class FileValidatorPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata): any {
        const fiveMb: number = 5000;

        return value.size < fiveMb;
    }
}