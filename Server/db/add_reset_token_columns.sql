-- Migration: Add reset_token and reset_token_expiry columns to users table
-- Run this SQL script to add the necessary columns for forgot password functionality

ALTER TABLE `users` 
ADD COLUMN `reset_token` VARCHAR(255) NULL DEFAULT NULL,
ADD COLUMN `reset_token_expiry` DATETIME NULL DEFAULT NULL;

-- Add index on reset_token for faster lookups
CREATE INDEX `idx_reset_token` ON `users` (`reset_token`);

