import { Entity, Column, PrimaryColumn, Generated } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  @Generated('increment')
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  constructor(email: string, name: string) {
    this.email = email;
    this.name = name;
  }

  public static of(email: string, name: string) {
    return new User(email, name);
  }
}
