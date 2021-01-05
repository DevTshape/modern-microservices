package models

import (
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

func ConnectDataBase() {

	user := getEnv("PG_USER", "postgres")
	password := getEnv("PG_PASS", "")
	host := getEnv("PG_HOST", "localhost")
	port := getEnv("PG_PORT", "5432")
	db := getEnv("PG_DB", "dev")

	dbinfo := fmt.Sprintf("user=%s password=%s host=%s port=%s dbname=%s sslmode=disable",
		user,
		password,
		host,
		port,
		db,
	)

	database, err := gorm.Open(postgres.Open(dbinfo), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database!")
	}

	// database.AutoMigrate(&Users{}, &UserRole{}, &Roles{}, &Permissions{}, &RolePermission{})

	DB = database
}
