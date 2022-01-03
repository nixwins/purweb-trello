import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ColumnEntity } from './columns.entity';
import { ColumnsService } from './columns.service';

@Crud({
  model: {
    type: ColumnEntity,
  },
})
@Controller('columns')
export class ColumnsController implements CrudController<ColumnEntity> {
  constructor(public service: ColumnsService) {}
}
