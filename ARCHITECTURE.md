# Architecture Guide - Spotlight

Ce document décrit l'architecture et les patterns utilisés dans le projet Spotlight. Utilisez-le comme référence pour implémenter de nouvelles fonctionnalités de manière cohérente.

## Stack Technique

- **Framework**: Angular 21 (Standalone Components)
- **Testing**: Vitest + Spectator
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript (Strict Mode)

## Principes Architecturaux

### Clean Architecture

Le projet suit une architecture en couches avec séparation claire des responsabilités :

```
Component (UI) → Controller → Service → Presenter → View
                     ↓           ↓          ↓        ↓
                  Domain     Domain    Domain   ViewModel
```

### Dependency Injection

- Utilisation du système DI d'Angular
- Providers personnalisés pour chaque feature
- Injection tokens pour les abstractions

## Structure d'une Feature

Chaque feature suit la même structure de fichiers :

```
feature/
├── feature.component.ts          # UI Component
├── feature.component.html        # Template
├── feature.component.spec.ts     # Tests
├── feature.controller.ts         # Logic Controller
├── feature.service.ts            # Business Logic
├── feature.presenter.ts          # Data Presentation
├── feature.view.ts               # View State Management
├── feature.provider.ts           # DI Configuration
└── models/
    ├── feature.view.model.ts     # View Models
    └── feature.domain.model.ts   # Domain Models
```

## Patterns et Conventions

### 1. Component (UI Layer)

**Responsabilités** :

- Affichage uniquement
- Délégation au Controller
- Pas de logique métier
- `ChangeDetectionStrategy.OnPush`

**Template** :

```typescript
@Component({
  selector: 'app-feature',
  imports: [],
  providers: [FEATURE_PROVIDER],
  templateUrl: './feature.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureComponent {
  private readonly featureView = inject(FeatureView);
  protected readonly featureController = inject(FeatureController);

  protected get viewModel() {
    return this.featureView.featureViewModel.get();
  }
}
```

**Conventions** :

- Injecter View en `private`
- Injecter Controller en `protected`
- Exposer le viewModel via un getter `protected`
- Pas de logique dans le component

### 2. Controller (Orchestration Layer)

**Responsabilités** :

- Orchestration des actions utilisateur
- Conversion View → Domain
- Appel au Service

**Template** :

```typescript
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  handleUserAction(viewData: ViewType) {
    const domainData = new DomainType(viewData.x, viewData.y);
    this.featureService.executeLogic(domainData);
  }
}
```

**Conventions** :

- Une méthode publique par action utilisateur
- Conversion des types View en types Domain
- Pas de logique métier

### 3. Service (Business Logic Layer)

**Responsabilités** :

- Logique métier pure
- Manipulation des modèles Domain
- Appel au Presenter

**Template** :

```typescript
export class FeatureService {
  constructor(private readonly featurePresenter: FeaturePresenter) {}

  executeLogic(domainData: DomainType) {
    const result = domainData.businessMethod();
    this.featurePresenter.presentResult(result);
  }
}
```

**Conventions** :

- Travailler uniquement avec des modèles Domain
- Pas de référence aux types View
- Déléguer la présentation au Presenter

### 4. Presenter (Presentation Layer)

**Responsabilités** :

- Conversion Domain → View
- Mise à jour du View State
- Calculs de présentation

**Template** :

```typescript
export class FeaturePresenter {
  constructor(private readonly featureView: FeatureView) {}

  presentResult(domainResult: DomainType): void {
    const viewModel = this.convertToViewModel(domainResult);
    this.featureView.update({ property: viewModel });
  }

  private convertToViewModel(domain: DomainType): ViewType {
    // Logique de conversion
  }
}
```

**Conventions** :

- Méthodes publiques `present*`
- Méthodes privées pour conversions
- Mise à jour du View via `update()`

### 5. View (State Management)

**Responsabilités** :

- Gestion de l'état de la vue
- État initial
- Méthodes de mise à jour

**Template** :

```typescript
export class FeatureView {
  constructor(public readonly featureViewModel: SignalService<FeatureViewModel>) {
    this.featureViewModel.set({
      // État initial
    });
  }

  update(partial: Partial<FeatureViewModel>) {
    this.featureViewModel.update((current) => ({
      ...current,
      ...partial,
    }));
  }

  // Méthodes utilitaires si nécessaire
}
```

**Conventions** :

- ViewModel en `public readonly`
- Initialisation dans le constructor
- Méthode `update()` pour mutations partielles
- Méthodes helpers pour logique de construction

### 6. Provider (DI Configuration)

**Responsabilités** :

- Configuration de l'injection de dépendances
- Factory pour les dépendances complexes

**Template** :

```typescript
export const FEATURE_PROVIDER = [
  {
    provide: FeatureView,
    useFactory: () => new FeatureView(new AngularSignalService<FeatureViewModel>()),
  },
  {
    provide: FeatureController,
    deps: [FeatureService],
  },
  {
    provide: FeaturePresenter,
    deps: [FeatureView],
  },
  {
    provide: FeatureService,
    deps: [FeaturePresenter],
  },
];
```

**Conventions** :

- Export d'une constante `FEATURE_PROVIDER`
- View avec factory (pour injecter AngularSignalService)
- Autres avec `deps`

### 7. Models

#### View Models

**Responsabilités** :

- Structure des données pour l'UI
- Propriétés readonly sauf pour les mutables

**Template** :

```typescript
export interface FeatureViewModel {
  readonly title: string;
  readonly staticData: string;
  mutableData: DataType[];
}

export interface ChildViewModel {
  readonly id: string;
  property: number;
}
```

#### Domain Models

**Responsabilités** :

- Logique métier
- Méthodes de manipulation
- Classes avec comportements

**Template** :

```typescript
export class EntityDomainModel {
  constructor(public readonly id: string, public readonly property: number) {}

  businessMethod(): ResultType {
    // Logique métier
  }

  isValid(criteria: string): boolean {
    // Validation
  }
}
```

**Conventions** :

- Classes pour les entités avec logique
- Propriétés readonly quand approprié
- Méthodes publiques pour comportements
- Pas de référence aux types View

## Signal Service Abstraction

### Interface

```typescript
export interface SignalService<T> {
  get(): T;
  set(value: T): void;
  update(updater: (currentValue: T) => T): void;
}
```

### Implémentations

- **AngularSignalService** : Pour la production
- **FakeSignalService** : Pour les tests

**Usage** :

- Toujours typer : `SignalService<YourViewModel>`
- Injection via factory dans Provider

## Router Service Abstraction

### Interface

```typescript
export interface RouterService {
  navigateTo(path: string): void;
}

export const ROUTER_SERVICE_TOKEN = new InjectionToken<RouterService>('RouterService');
```

### Implémentations

- **AngularRouterService** : Pour la production
- **FakeRouterService** : Pour les tests

**Usage** :

- Injection via token
- Configuration dans `app.config.ts`

## Tests

### Component Tests

**Template** :

```typescript
describe('FeatureComponent', () => {
  let spectator: Spectator<FeatureComponent>;
  let fakeService: FakeServiceType;

  const createComponent = createComponentFactory({
    component: FeatureComponent,
    providers: [
      {
        provide: SERVICE_TOKEN,
        useFactory: () => fakeService,
      },
    ],
  });

  beforeEach(() => {
    fakeService = new FakeServiceType();
    spectator = createComponent();
  });

  it('should display data', () => {
    expect(spectator.query('[data-testid="element"]')?.textContent).toContain('Expected');
  });

  it('should handle interaction', () => {
    spectator.click('[data-testid="button"]');
    expect(fakeService.called).toBeTruthy();
  });
});
```

**Conventions** :

- Utiliser Spectator
- Attributs `data-testid` pour sélection
- Injecter des fakes pour les dépendances externes
- Un test par comportement

## Routes

**Structure** :

```typescript
export enum path {
  feature = 'feature-path',
}

export const routes: Routes = [
  {
    path: path.feature,
    component: FeatureComponent,
  },
];
```

**Conventions** :

- Enum pour les paths
- Export depuis `app.routes.ts`

## Naming Conventions

### Files

- **Component** : `feature.component.ts`
- **Controller** : `feature.controller.ts`
- **Service** : `feature.service.ts`
- **Presenter** : `feature.presenter.ts`
- **View** : `feature.view.ts`
- **Provider** : `feature.provider.ts`
- **View Model** : `feature.view.model.ts`
- **Domain Model** : `feature.domain.model.ts`
- **Tests** : `feature.component.spec.ts`

### Classes

- **Component** : `FeatureComponent`
- **Controller** : `FeatureController`
- **Service** : `FeatureService`
- **Presenter** : `FeaturePresenter`
- **View** : `FeatureView`
- **View Model** : `FeatureViewModel`
- **Domain Model** : `EntityDomainModel`

### Constants

- **Provider** : `FEATURE_PROVIDER` (SCREAMING_SNAKE_CASE)
- **Tokens** : `SERVICE_TOKEN` (SCREAMING_SNAKE_CASE)

## Checklist pour une Nouvelle Feature

- [ ] Créer le dossier `src/app/feature-name/`
- [ ] Créer les models (view + domain)
- [ ] Créer la View avec état initial
- [ ] Créer le Presenter avec conversions
- [ ] Créer le Service avec logique métier
- [ ] Créer le Controller avec orchestration
- [ ] Créer le Provider avec DI
- [ ] Créer le Component avec template
- [ ] Créer les tests
- [ ] Ajouter la route si nécessaire
- [ ] Respecter le Design System

## Example Complet : Game Feature

Voir les fichiers :

- `src/app/game/game.component.ts`
- `src/app/game/game.controller.ts`
- `src/app/game/game.service.ts`
- `src/app/game/game.presenter.ts`
- `src/app/game/game.view.ts`
- `src/app/game/game.provider.ts`
- `src/app/game/models/*.ts`

## Pour Demander une Nouvelle Feature

Utilisez ce template :

```
Je veux ajouter une feature [NOM] qui fait [DESCRIPTION].

Actions utilisateur :
- [Action 1]
- [Action 2]

Données à afficher :
- [Donnée 1]
- [Donnée 2]

Logique métier :
- [Règle 1]
- [Règle 2]

Suis l'architecture décrite dans ARCHITECTURE.md
```
