package models

import (
	"github.com/DevTshape/modern-microservices/auth/inputs"
	"github.com/DevTshape/modern-microservices/auth/service"
)

type Users struct {
	ID       uint
	Email    string
	Password string
}

type UserRole struct {
	UserId uint `gorm:"primary_key"`
	RoleId uint `gorm:"primary_key"`
}

func (UserRole) TableName() string {
	return "user_role"
}

func (Users) TableName() string {
	return "users"
}

var argon2ID = service.NewArgon2ID()

func getRolePermissionByRoleIds(roleIds []uint) []string {
	type NameResult struct {
		Name string
	}
	var nameResult []NameResult
	DB.Table("permission").Select("name").
		Joins("left join role_permission on role_permission.permission_id = permission.id").
		Where("role_permission.role_id in (?)", roleIds).Scan(&nameResult)
	var result []string
	for _, v := range nameResult {
		result = append(result, v.Name)
	}
	return result
}

func GetUserPermission(userId uint) []string {
	var userRoles []UserRole
	DB.Where("user_id = ?", userId).Find(&userRoles)
	var roleIds []uint
	for _, v := range userRoles {
		roleIds = append(roleIds, v.RoleId)
	}
	return getRolePermissionByRoleIds(roleIds)
}

func CreateUser(input inputs.RegisterInput) (*Users, error) {
	password, err := argon2ID.Hash(input.Password)
	if err != nil {
		return nil, err
	}
	var newUser Users = Users{
		Email:    input.Email,
		Password: password,
	}
	if err := DB.Create(&newUser).Error; err != nil {
		return nil, err
	}
	// DB.Transaction(func(tx *gorm.DB) error {
	// 	result := tx.Create(&newUser) // pass pointer of data to Create
	// 	if result.Error != nil {
	// 		return nil, result.Error
	// 	}

	// 	// res := 
	// })

	return &newUser, nil
}

func FindByEmail(email string) (*Users, error) {
	var user Users;
	if err := DB.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}


func UserExists(email string) (bool, error) {
	var user Users;
	result := DB.Where("email = ?", email).First(&user)
    if result.Error != nil {
        return false, nil
    }

    return true, nil
}

func FindById(id uint) (*Users, error) {
	var user Users;
	result := DB.Where("ID = ?", id).First(&user)

    if result.Error != nil {
        return nil, result.Error
    }

    return &user, nil
}