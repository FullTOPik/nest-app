import { ApiProperty } from "@nestjs/swagger";

export class InformationMessage {
  @ApiProperty()
  message: string;
}

