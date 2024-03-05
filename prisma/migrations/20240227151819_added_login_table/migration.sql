-- CreateTable
CREATE TABLE "login" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "deviceData" TEXT NOT NULL,
    "access_token_created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "login_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "login_access_token_key" ON "login"("access_token");
