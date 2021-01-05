package routes

import (
	"github.com/DevTshape/modern-microservices/auth/handler"
	"github.com/gin-gonic/gin"
)

func Routes(router *gin.Engine) {
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
			"service": "auth",
		})
	})
	authHandler := new(handler.AuthHandler)
	v1 := router.Group("/v1")
	authRoutes := v1.Group("/auth")

	authRoutes.POST("/login", authHandler.Login)
	authRoutes.POST("/register", authHandler.Register)
	authRoutes.POST("/verify", authHandler.Verify)
}
