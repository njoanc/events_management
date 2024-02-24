import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1706564378357 implements MigrationInterface {
    name = 'migration1706564378357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_01cd2b829e0263917bf570cb672\` ON \`event\``);
        await queryRunner.query(`DROP INDEX \`FK_ceeb6fe53eb68ff475c56c4f37b\` ON \`event_feedback\``);
        await queryRunner.query(`DROP INDEX \`FK_7d85e02cada107c99eb697dd1fe\` ON \`attendee\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`firstName\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`firstName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`lastName\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`lastName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phoneNumber\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`location\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`location\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`location\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`location\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`imageUrl\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`imageUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event_feedback\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`event_feedback\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event_feedback\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`event_feedback\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`attendee\` DROP COLUMN \`firstName\``);
        await queryRunner.query(`ALTER TABLE \`attendee\` ADD \`firstName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`attendee\` DROP COLUMN \`lastName\``);
        await queryRunner.query(`ALTER TABLE \`attendee\` ADD \`lastName\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_9ccf96017c5f96f5c58351f3a6\` ON \`attendee\``);
        await queryRunner.query(`ALTER TABLE \`attendee\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`attendee\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`attendee\` ADD UNIQUE INDEX \`IDX_9ccf96017c5f96f5c58351f3a6\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`attendee\` DROP COLUMN \`organizationSchool\``);
        await queryRunner.query(`ALTER TABLE \`attendee\` ADD \`organizationSchool\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`attendee\` DROP COLUMN \`avatar\``);
        await queryRunner.query(`ALTER TABLE \`attendee\` ADD \`avatar\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_6f65b2c04ef9f60f92d43b5405\` ON \`user\` (\`email\`, \`phoneNumber\`)`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_01cd2b829e0263917bf570cb672\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event_feedback\` ADD CONSTRAINT \`FK_ceeb6fe53eb68ff475c56c4f37b\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attendee\` ADD CONSTRAINT \`FK_7d85e02cada107c99eb697dd1fe\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attendee\` DROP FOREIGN KEY \`FK_7d85e02cada107c99eb697dd1fe\``);
        await queryRunner.query(`ALTER TABLE \`event_feedback\` DROP FOREIGN KEY \`FK_ceeb6fe53eb68ff475c56c4f37b\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_01cd2b829e0263917bf570cb672\``);
        await queryRunner.query(`DROP INDEX \`IDX_6f65b2c04ef9f60f92d43b5405\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`attendee\` DROP COLUMN \`avatar\``);
        await queryRunner.query(`ALTER TABLE \`attendee\` ADD \`avatar\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`attendee\` DROP COLUMN \`organizationSchool\``);
        await queryRunner.query(`ALTER TABLE \`attendee\` ADD \`organizationSchool\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`attendee\` DROP INDEX \`IDX_9ccf96017c5f96f5c58351f3a6\``);
        await queryRunner.query(`ALTER TABLE \`attendee\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`attendee\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_9ccf96017c5f96f5c58351f3a6\` ON \`attendee\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`attendee\` DROP COLUMN \`lastName\``);
        await queryRunner.query(`ALTER TABLE \`attendee\` ADD \`lastName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`attendee\` DROP COLUMN \`firstName\``);
        await queryRunner.query(`ALTER TABLE \`attendee\` ADD \`firstName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event_feedback\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`event_feedback\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event_feedback\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`event_feedback\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`imageUrl\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`imageUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`location\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`location\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`location\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`location\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phoneNumber\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`lastName\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`lastName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`firstName\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`firstName\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`FK_7d85e02cada107c99eb697dd1fe\` ON \`attendee\` (\`eventId\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_ceeb6fe53eb68ff475c56c4f37b\` ON \`event_feedback\` (\`eventId\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_01cd2b829e0263917bf570cb672\` ON \`event\` (\`userId\`)`);
    }

}
