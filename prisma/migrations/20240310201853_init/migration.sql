-- CreateTable
CREATE TABLE `Content` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `genContent` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `suggestions` JSON NOT NULL,

    UNIQUE INDEX `Content_genContent_key`(`genContent`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Token` (
    `clerkId` VARCHAR(191) NOT NULL,
    `tokens` INTEGER NOT NULL DEFAULT 3000,

    PRIMARY KEY (`clerkId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
