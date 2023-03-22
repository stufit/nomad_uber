import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }
  async getOrCreate(name: string): Promise<Category> {
    const categoryname = name.trim().toLowerCase().replace(/ +/g, '');
    const categorySlug = categoryname.replace(/ /g, '-');
    let category = await this.findOne({
      where: { slug: categorySlug },
    });
    if (!category) {
      category = await this.save(
        this.create({ slug: categorySlug, name: categoryname }),
      );
    }
    return category;
  }
}
