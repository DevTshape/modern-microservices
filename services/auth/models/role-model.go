package models

type Roles struct {
	ID     uint   `json:"id" gorm:"PRIMARY_KEY;AUTO_INCREMENT"`
	Name   string `json:"name" gorm:"Type:varchar(100);NOT NULL"`
	Description   string `json:"description"`
	Status string `json:"status"`
}

type Permissions struct {
	ID          uint   `json:"id" gorm:"PRIMARY_KEY;AUTO_INCREMENT"`
	Name        string `json:"name" gorm:"Type:varchar(100);NOT NULL"`
	DisplayName string `json:"displayName"`
	Description        string `json:"description"`
	Status      string `json:"status"`
}

type RolePermission struct {
	PermissionId uint `gorm:"primary_key"`
	RoleId       uint `gorm:"primary_key"`
}

func (RolePermission) TableName() string {
	return "role_permission"
}

func (Permissions) TableName() string {
	return "permissions"
}

func (Roles) TableName() string {
	return "roles"
}
