import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { LocationInterface } from '../../../interface/location.interface';

export class NewPickingInterface {
  @ApiModelProperty()
  startingLocation: LocationInterface;
}
