import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1706005452393 implements MigrationInterface {
    name = 'migration1706005452393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`role\` enum ('USER', 'ADMIN') NOT NULL DEFAULT 'ADMIN', UNIQUE INDEX \`IDX_6f65b2c04ef9f60f92d43b5405\` (\`email\`, \`phoneNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`event\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`dateOfEvent\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`eventStartTime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`eventEndTime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`dateOfReminder\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`imageUrl\` varchar(255) NOT NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`event_feedback\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`eventId\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`satisfaction\` int NOT NULL, \`inclusion\` int NOT NULL, \`likelihoodToAttend\` int NOT NULL, \`keyTakeAway\` text NULL, \`comment\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`attendee\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`dob\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`gender\` enum ('FEMALE', 'MALE', 'OTHER') NOT NULL, \`organizationSchool\` varchar(255) NOT NULL, \`avatar\` varchar(255) NOT NULL, \`eventId\` int NOT NULL, UNIQUE INDEX \`IDX_9ccf96017c5f96f5c58351f3a6\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_01cd2b829e0263917bf570cb672\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event_feedback\` ADD CONSTRAINT \`FK_ceeb6fe53eb68ff475c56c4f37b\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attendee\` ADD CONSTRAINT \`FK_7d85e02cada107c99eb697dd1fe\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attendee\` DROP FOREIGN KEY \`FK_7d85e02cada107c99eb697dd1fe\``);
        await queryRunner.query(`ALTER TABLE \`event_feedback\` DROP FOREIGN KEY \`FK_ceeb6fe53eb68ff475c56c4f37b\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_01cd2b829e0263917bf570cb672\``);
        await queryRunner.query(`DROP INDEX \`IDX_9ccf96017c5f96f5c58351f3a6\` ON \`attendee\``);
        await queryRunner.query(`DROP TABLE \`attendee\``);
        await queryRunner.query(`DROP TABLE \`event_feedback\``);
        await queryRunner.query(`DROP TABLE \`event\``);
        await queryRunner.query(`DROP INDEX \`IDX_6f65b2c04ef9f60f92d43b5405\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
