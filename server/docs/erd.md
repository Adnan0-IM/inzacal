erDiagram

  USER ||--o{ SESSION : has
  USER ||--o{ ACCOUNT : has
  USER ||--o{ TWO_FACTOR : uses
  USER ||--o{ MEMBER : belongs_to
  USER ||--o{ SALE : creates
  USER ||--o{ NOTIFICATION : receives

  ORGANIZATION ||--o{ MEMBER : has
  ORGANIZATION ||--o{ PRODUCT : owns
  ORGANIZATION ||--o{ SALE : records
  ORGANIZATION ||--o{ CUSTOMER : serves
  ORGANIZATION ||--o{ LOCATION : operates
  ORGANIZATION ||--o{ INVITATION : sends
  ORGANIZATION ||--o{ TAX_RULE : defines

  MEMBER }o--|| USER : references
  MEMBER }o--|| ORGANIZATION : references

  SALE ||--o{ SALE_LINE_ITEM : contains
  SALE }o--|| USER : created_by
  SALE }o--|| ORGANIZATION : belongs_to
  SALE }o--|| CUSTOMER : optional
  SALE }o--|| LOCATION : optional

  PRODUCT ||--o{ SALE_LINE_ITEM : sold_as
  PRODUCT ||--o{ PRODUCT_STOCK : tracked_in
  PRODUCT }o--|| ORGANIZATION : belongs_to

  PRODUCT_STOCK }o--|| PRODUCT : tracks
  PRODUCT_STOCK }o--|| LOCATION : stored_at

  CUSTOMER ||--o{ SALE : places
  CUSTOMER }o--|| ORGANIZATION : belongs_to

  LOCATION ||--o{ SALE : occurs_at
  LOCATION ||--o{ PRODUCT_STOCK : holds
  LOCATION }o--|| ORGANIZATION : belongs_to
