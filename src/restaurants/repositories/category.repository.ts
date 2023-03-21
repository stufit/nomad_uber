import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

// @EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
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
