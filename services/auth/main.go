package main

import (
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/DevTshape/modern-microservices/auth/models"
	"github.com/DevTshape/modern-microservices/auth/routes"
	"github.com/joho/godotenv"

	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	ginprometheus "github.com/zsais/go-gin-prometheus"
	"go.uber.org/ratelimit"
)

var (
	err   error
	limit ratelimit.Limiter
)

func main() {
	// Load env's
	err := godotenv.Load()
	if err != nil {
		log.Printf("Error loading .env file")
	}
	i, err := strconv.Atoi(os.Getenv("RATE_LIMIT"))
	if err != nil {
		// handle error
		fmt.Println(err)
		os.Exit(2)
	}
	limit = ratelimit.New(i)
	log.Printf("Current Rate Limit: %v requests/s", i)
	log.Println("Starting server..")
	// Init Router
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"*"},
		AllowCredentials: true,
	}))
	p := ginprometheus.NewPrometheus("gin")
	p.Use(router)
	models.ConnectDataBase()
	// Route Handlers / Endpoints
	routes.Routes(router)
	// Start Server
	log.Fatal(router.Run(":5000"))
}
