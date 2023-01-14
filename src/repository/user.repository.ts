import { SignUpDto } from 'src/dto/sign-up.dto';
import { User } from 'src/orm/models/user.model';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(user: SignUpDto): Promise<User> {
    let newUser: User;
    // eslint-disable-next-line prefer-const
    newUser = this.create(user);
    return await this.save(newUser);
  }

  async getUserInfo(id: number) {
    return await this.createQueryBuilder('user')
      .select('user.id')
      .addSelect('user.nickname')
      .innerJoinAndSelect('user.community', 'community')
      .where('user.id = :id', { id })
      .getOne();
  }

  async checkExistUser(id: number): Promise<boolean> {
    const user = await this.createQueryBuilder('user')
      .select('user.id')
      .where('user.id = :id', { id })
      .getOne();
    if (user) {
      return true;
    }
    return false;
  }
}
