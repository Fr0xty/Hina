-- CreateTable
CREATE TABLE "User" (
    "id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvatarHistory" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "object_key" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AvatarHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AvatarHistory_object_key_key" ON "AvatarHistory"("object_key");

-- CreateIndex
CREATE INDEX "AvatarHistory_user_id_created_at_idx" ON "AvatarHistory"("user_id", "created_at" DESC);

-- AddForeignKey
ALTER TABLE "AvatarHistory" ADD CONSTRAINT "AvatarHistory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
