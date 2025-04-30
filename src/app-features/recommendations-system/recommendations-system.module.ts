import { Module } from '@nestjs/common';
import { RecommendationsSystemService } from './recommendations-system.service';
import { RecommendationsSystemController } from './recommendations-system.controller';

@Module({
  controllers: [RecommendationsSystemController],
  providers: [RecommendationsSystemService],
})
export class RecommendationsSystemModule {}
