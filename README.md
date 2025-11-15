# Pro Alt SCRP - NestJS Backend

## 📋 Descripción

Backend API RESTful construido con **NestJS** siguiendo principios de **Domain-Driven Design (DDD)** y **Arquitectura Hexagonal**. El proyecto implementa una capa de aplicación desacoplada usando un patrón **UseCaseBus** para gestionar Commands y Queries.

---

## 🏗️ Arquitectura

### **Domain-Driven Design (DDD) + Hexagonal Architecture**

El proyecto sigue una estructura modular por dominio con separación clara de responsabilidades:

```
src/
├── authentication/           # Módulo de dominio
│   └── user/
│       ├── application/      # Casos de uso (Commands & Queries)
│       ├── domain/           # Lógica de negocio pura
│       │   ├── model/        # Entidades de dominio
│       │   ├── repositories/ # Interfaces (Ports)
│       │   └── value-objects/
│       └── infrastructure/   # Adaptadores
│           ├── persistence/  # TypeORM entities & repos
│           └── rest/         # Controllers & DTOs
├── config/                   # Configuración global
│   └── database/             # TypeORM config & migrations
└── shared/                   # Módulos compartidos
    ├── common/               # Value Objects, excepciones
    └── use-case-bus/         # Bus de casos de uso
```

### **¿Por qué esta arquitectura?**

### **Capas del proyecto:**

1. **Domain (Dominio)**: Lógica de negocio pura, sin dependencias externas
   - Entities, Value Objects, Repository interfaces, Domain Exceptions

2. **Application (Aplicación)**: Orquestación de casos de uso
   - Commands (escritura), Queries (lectura), Use Case Handlers

3. **Infrastructure (Infraestructura)**: Detalles técnicos
   - Persistencia (TypeORM), REST (Controllers), Adapters externos

### **¿Por qué DDD con Clean Architecture?**

✅ **Dominio independiente**: La lógica de negocio no conoce NestJS ni TypeORM  
✅ **Testabilidad**: Cada capa puede probarse aisladamente con mocks  
✅ **Escalabilidad**: Nuevos módulos de dominio sin afectar existentes  
✅ **Mantenibilidad**: Cambios en infraestructura no afectan el dominio  
✅ **Claridad**: El código refleja el lenguaje del negocio (Ubiquitous Language)

---

## 🚀 UseCaseBus Pattern

### **¿Qué es?**

Un bus centralizado que ejecuta casos de uso (Commands/Queries) sin exponer la implementación de los handlers.

### **¿Por qué usarlo?**

- **Desacoplamiento**: Controllers no conocen handlers directamente
- **Seguridad**: Previene acceso directo a lógica de negocio
- **Flexibilidad**: Fácil cambiar implementaciones sin tocar controllers
- **Type-safe**: Inferencia de tipos automática con TypeScript

### **Uso**

```typescript
// 1. Definir el caso de uso
export class GetUserById implements IUseCase {
  constructor(public readonly userId: string) {}
}

// 2. Crear el handler
@UseCaseHandler(GetUserById)
export class GetUserByIdUseCase implements IUseCaseHandler<GetUserById> {
  async execute(query: GetUserById) {
    // Lógica aquí
  }
}

// 3. Registrar en el módulo
@Module({
  imports: [UseCaseModule.register(...UseCases)],
  providers: [...UseCases]
})
export class UserModule {}

// 4. Ejecutar desde el controller
@Get(':id')
async getUser(@Param('id') id: string) {
  return this.useCaseBus.execute(new GetUserById(id));
}
```

---

## 🗄️ Base de Datos

### **TypeORM con Naming Strategy personalizado**

- Convención: `UPPERCASE_SNAKE_CASE` para todas las columnas y tablas
- Migrations automáticas por módulo de dominio
- Schemas separados por contexto (ej: `AUTHENTICATION`)

### **Crear Migraciones**

```bash
# Windows
npm run windows:migration:create --module=authentication --api=user --name=create-users-table

# Linux/Mac
npm run migration:create --module=authentication --api=user --name=create-users-table
```

### **Ejecutar Migraciones**

```bash
# Windows
npm run windows:migration:run

# Linux/Mac
npm run migration:run
```

### **Revertir Migraciones**

```bash
# Windows
npm run windows:migration:rollback

# Linux/Mac
npm run migration:rollback
```

Las migraciones se generan en:  
`src/{module}/{api}/infrastructure/persistence/migrations/`

---

## 🛠️ Instalación y Ejecución

### **Instalación**

```bash
npm install
```

### **Variables de Entorno**

Crear archivo `.env`:

```env
API_PORT=3000
DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=pro_alt_db
```

### **Ejecutar**

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

---

## 📦 Módulos Principales

### **UseCaseBus**
Bus global para ejecutar casos de uso con auto-registro de handlers.

### **Common**
Value Objects reutilizables: `Uuid`, `Email`, `Password`, `Pagination`, etc.

### **Authentication**
Módulo de autenticación con gestión de usuarios (en desarrollo).

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

---

## 📝 Convenciones

- **Casos de uso**: Separados en `commands/` y `queries/`
- **Nomenclatura DB**: `UPPERCASE_SNAKE_CASE`
- **Imports**: Usar alias `@shared` para módulos compartidos
- **Value Objects**: Inmutables, validación en constructor
- **Excepciones**: Personalizadas por dominio

---

## 🤝 Contribución

1. Crear feature branch desde `main`
2. Seguir estructura DDD por módulo
3. Tests obligatorios para casos de uso
4. Commit messages: [Conventional Commits](https://www.conventionalcommits.org/)

---

## 📄 Licencia

MIT License 2.0

---

**Built with ❤️ using NestJS, TypeScript, and DDD principles**
