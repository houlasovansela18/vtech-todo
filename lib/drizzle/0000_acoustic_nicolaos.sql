CREATE TABLE `todo_tb` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`todo` varchar(256) NOT NULL,
	`isCompleted` boolean NOT NULL DEFAULT false,
	`createAt` timestamp(0) NOT NULL DEFAULT (now()),
	CONSTRAINT `todo_tb_id` PRIMARY KEY(`id`),
	CONSTRAINT `todo_tb_todo_unique` UNIQUE(`todo`)
);
