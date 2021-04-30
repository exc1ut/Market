import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { JournalModule } from './journal/journal.module';
import { ClientModule } from './client/client.module';
import { OrganizationInfoModule } from './organization-info/organization-info.module';

@Module({
  imports: [UserModule, AuthModule, CategoriesModule, ProductsModule, JournalModule, ClientModule, OrganizationInfoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
