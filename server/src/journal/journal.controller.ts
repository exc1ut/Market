import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JournalService } from './journal.service';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/rbac/roles.guard';
import { Roles } from 'src/auth/rbac/roles.decorator';
import { Role } from 'src/auth/rbac/role.enum';
import { GetProductsDto } from './dto/get-products.dto';
import { ReturnProductDto } from './dto/return-product.dto';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  // @Roles(Role.User)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createJournalDto: CreateJournalDto, @Request() req) {
    const userId = req.user.id;
    return this.journalService.create(createJournalDto, userId);
  }

  @Get()
  findAll() {
    return this.journalService.findAll();
  }

  @Post('getProducts')
  getProducts(@Body() getProductsDto: GetProductsDto) {
    console.log(getProductsDto);

    return this.journalService.getProducts(getProductsDto);
  }

  @Post('return')
  returnProducts(@Body() { journalProductId, quantity }: ReturnProductDto) {
    console.log(journalProductId, quantity);

    return this.journalService.return(journalProductId, quantity);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.journalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJournalDto: UpdateJournalDto) {
    return this.journalService.update(+id, updateJournalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.journalService.remove(+id);
  }
}
