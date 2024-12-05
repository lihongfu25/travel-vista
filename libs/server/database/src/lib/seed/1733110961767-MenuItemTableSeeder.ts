import { MigrationInterface, QueryRunner } from 'typeorm';

export class MenuItemTableSeeder1733110961767 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminMenu = await queryRunner.query(
      'SELECT * FROM menu WHERE roleId = (SELECT id FROM role WHERE slug = "admin")'
    );

    const items = [
      {
        label: 'Dashboard',
        link: '/admin',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="inherit" fill="none">
                  <path d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V8C10 9.88562 10 10.8284 9.41421 11.4142C8.82843 12 7.88562 12 6 12C4.11438 12 3.17157 12 2.58579 11.4142C2 10.8284 2 9.88562 2 8V6Z" stroke="currentColor" stroke-width="1.5" />
                  <path d="M2 19C2 18.0681 2 17.6022 2.15224 17.2346C2.35523 16.7446 2.74458 16.3552 3.23463 16.1522C3.60218 16 4.06812 16 5 16H7C7.93188 16 8.39782 16 8.76537 16.1522C9.25542 16.3552 9.64477 16.7446 9.84776 17.2346C10 17.6022 10 18.0681 10 19C10 19.9319 10 20.3978 9.84776 20.7654C9.64477 21.2554 9.25542 21.6448 8.76537 21.8478C8.39782 22 7.93188 22 7 22H5C4.06812 22 3.60218 22 3.23463 21.8478C2.74458 21.6448 2.35523 21.2554 2.15224 20.7654C2 20.3978 2 19.9319 2 19Z" stroke="currentColor" stroke-width="1.5" />
                  <path d="M14 16C14 14.1144 14 13.1716 14.5858 12.5858C15.1716 12 16.1144 12 18 12C19.8856 12 20.8284 12 21.4142 12.5858C22 13.1716 22 14.1144 22 16V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V16Z" stroke="currentColor" stroke-width="1.5" />
                  <path d="M14 5C14 4.06812 14 3.60218 14.1522 3.23463C14.3552 2.74458 14.7446 2.35523 15.2346 2.15224C15.6022 2 16.0681 2 17 2H19C19.9319 2 20.3978 2 20.7654 2.15224C21.2554 2.35523 21.6448 2.74458 21.8478 3.23463C22 3.60218 22 4.06812 22 5C22 5.93188 22 6.39782 21.8478 6.76537C21.6448 7.25542 21.2554 7.64477 20.7654 7.84776C20.3978 8 19.9319 8 19 8H17C16.0681 8 15.6022 8 15.2346 7.84776C14.7446 7.64477 14.3552 7.25542 14.1522 6.76537C14 6.39782 14 5.93188 14 5Z" stroke="currentColor" stroke-width="1.5" />
              </svg>`,
        sort: 1,
        parentId: null,
      },
      {
        label: 'Menu',
        link: '/admin/menu',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="inherit" fill="none">
                  <path d="M4 5L20 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M4 12L20 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M4 19L20 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>`,
        sort: 2,
        parentId: null,
      },
    ];

    const query = queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('menuItem');
    const query2 = queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('menuMenuItem');
    let id = 1;
    for (const item of items) {
      await query.values({ id, ...item }).execute();
      await query2
        .values({ id, menuId: adminMenu[0].id, menuItemId: id })
        .execute();
      id++;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('menuItem');
    await queryRunner.clearTable('menuMenuItem');
  }
}
