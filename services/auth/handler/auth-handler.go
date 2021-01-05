package handler

import (
	"net/http"

	"github.com/DevTshape/modern-microservices/auth/inputs"
	"github.com/DevTshape/modern-microservices/auth/models"
	"github.com/DevTshape/modern-microservices/auth/service"
	"github.com/gin-gonic/gin"
)

type AuthHandler struct{}

var argon2ID = service.NewArgon2ID()

func (a AuthHandler) Register(c *gin.Context) {
	var input inputs.RegisterInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userExists, err := models.UserExists(input.Email)
	if userExists == true {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": "An account already exists with that email"})
		return
	}

	user, err := models.CreateUser(input)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Something went wrong"})
		return
	}

	ts, err := service.CreateToken(user.ID)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, err.Error())
		return
	}
	saveErr := service.CreateAuth(user.ID, ts)
	if saveErr != nil {
		c.JSON(http.StatusUnprocessableEntity, saveErr.Error())
	}
	tokens := map[string]string{
		"access_token":  ts.AccessToken,
		"refresh_token": ts.RefreshToken,
	}

	c.JSON(http.StatusOK, tokens)
}

func (a AuthHandler) Login(c *gin.Context) {
	var u models.Users
	if err := c.ShouldBindJSON(&u); err != nil {
		c.JSON(http.StatusUnprocessableEntity, "Invalid json provided")
		return
	}
	//compare the user from the request, with the one we defined:
	// Todo : compare hash
	user, err := models.FindByEmail(u.Email)
	if err != nil {
		c.JSON(http.StatusUnauthorized, "Please provide valid email")
		return
	}
	ok, err := argon2ID.Verify(u.Password, user.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, "Please provide valid password")
		return
	}
	if !ok {
		c.JSON(http.StatusUnauthorized, "Please provide valid password")
		return
	}

	ts, err := service.CreateToken(user.ID)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, err.Error())
		return
	}
	saveErr := service.CreateAuth(user.ID, ts)
	if saveErr != nil {
		c.JSON(http.StatusUnprocessableEntity, saveErr.Error())
	}
	tokens := map[string]string{
		"access_token":  ts.AccessToken,
		"refresh_token": ts.RefreshToken,
	}
	c.JSON(http.StatusOK, tokens)
}


func (a AuthHandler) Verify(c *gin.Context) {
	//Extract the access token metadata 
	metadata, err := service.ExtractTokenMetadata(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, "unauthorized")
		return
	}
	userid, err := service.FetchAuth(metadata)
	if err != nil {
		c.JSON(http.StatusUnauthorized, err.Error())
		return
	}

	u, err := models.FindById(userid)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}
	c.JSON(http.StatusOK, gin.H{"ID": u.ID})
}