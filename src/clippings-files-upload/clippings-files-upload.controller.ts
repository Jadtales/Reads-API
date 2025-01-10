import {
    Body,
    Controller,
    HttpStatus,
    Param,
    ParseFilePipeBuilder,
    Post,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';

import {ClippingsFilesUploadService} from "./providers/clippings-files-upload.service";
import UploadExtractedHighlightsService from "./providers/upload-extracted-highlights.service";

import HighlightsDto from "./dtos/highlights.dto";

@Controller('upload')
export class ClippingsFilesUploadController {
    constructor(
        private readonly clippingsFilesUploadService: ClippingsFilesUploadService,
        private readonly uploadExtractedHighlightsService: UploadExtractedHighlightsService
    ) {
    }

    @Post('file/:userId')
    @UseInterceptors(FileInterceptor('file'))
    uploadUserKindleFiles(@Param('userId') userId: string, @UploadedFile(
        new ParseFilePipeBuilder()
            .addFileTypeValidator({fileType: 'text/plain'})
            .addMaxSizeValidator({maxSize: 5000, message: 'File must be less than 5MB'})
            .build({errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY})
    ) file: Express.Multer.File) {
        return this.clippingsFilesUploadService.addKindleClippings(userId, file);
    }

    @Post('highlights/:userId')
    uploadHighlights(@Param('userId') userId: string, @Body() highlights: HighlightsDto) {
        return this.uploadExtractedHighlightsService.uploadUserHighlights(userId, highlights);
    }
}