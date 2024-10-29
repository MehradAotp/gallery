import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategoryDto';
import { UpdateCategoryDto } from './dto/updateCategoryDto';
import { ApiTags } from '@nestjs/swagger';

import { createCategory } from 'decorators/category/decoraator.createCategory';
import { getAllCategories } from 'decorators/category/decorator.getAllCategories';
import { updateCategory } from 'decorators/category/decorator.updateCategory';
import { deleteCategory } from 'decorators/category/decorator.deleteCategory';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  //Post
  @Post()
  @createCategory()
  async CreateCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }
  //Get
  @Get()
  @getAllCategories()
  async getAllCategories() {
    return this.categoryService.allCategory();
  }
  //Patch
  @Patch(':id')
  @updateCategory()
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }
  //Delete
  @Delete(':id')
  @deleteCategory()
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
