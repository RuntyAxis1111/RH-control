-- Añade la columna si aún no existe
alter table public.equipos_ti
  add column if not exists company text;

-- Rellena los registros actuales con 'AJA'
update public.equipos_ti
  set company = 'AJA'
where company is null;

-- Fija default y restricción
alter table public.equipos_ti
  alter column company set default 'AJA',
  alter column company set not null,
  add constraint equipos_ti_company_check check (company in ('HBL','AJA'));