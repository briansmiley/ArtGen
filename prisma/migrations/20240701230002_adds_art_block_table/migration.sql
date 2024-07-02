-- CreateTable
CREATE TABLE "ArtBlock" (
    "id" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ArtBlock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArtBlock" ADD CONSTRAINT "ArtBlock_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
