import { Controller, Get, Param, ParseUUIDPipe } from "@nestjs/common";
import { RecommendationsSystemService } from './recommendations-system.service';

@Controller('recommendations-system')
export class RecommendationsSystemController {
  constructor(
    private readonly recommendationsSystemService: RecommendationsSystemService,
  ) {}

  @Get('user-daily-recs/:id') // Recs stand for Recommendations
  getUserDailyRecs(
    @Param('id', new ParseUUIDPipe()) userId: string,
  ) {
    return this.recommendationsSystemService.userDailyRecs(userId);
  }
}
