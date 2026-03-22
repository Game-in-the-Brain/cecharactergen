# CE CharacterGen — Justin's Working Log

**Last updated:** 2026-03-21

This file tracks in-progress and pending work before milestone coding begins. It is a personal scratchpad — not a spec document.

---

## Pre-Coding Gate Status

All three items below must be **Done** before M1 coding starts.

| Gate Item | Status | Notes |
|-----------|--------|-------|
| **UI consolidated** | ✅ Done | UI_REQUIREMENTS.md complete — accordion, phone-first, 7 steps |
| **Rules consolidated** | ✅ Done | Jovian, Voidborn, Terran, Half-Jovian, transplants, CJVAP, Low/High/Rad conditions all in MECH-4.8–4.10 |
| **Milestone FRs broken down** | 🔄 Ready to start | UI + Rules both consolidated — can now walk M1→M4 FRs |

---

## Docs Status

| File | Purpose | Status |
|------|---------|--------|
| `UI_REQUIREMENTS.md` | Phone-first accordion UX, screen inventory, .cef format, Library hierarchy | ✅ Complete — authoritative UI spec |
| `CE_Mneme_Character_Generation_mechanics.md` | Rule reference indexed by MECH-N.N anchors | 🔄 Species section incomplete (see below) |
| `DATA_ARCHITECTURE.md` | All 18 JSON schemas indexed by DA-N.N anchors | ✅ Written — needs species.json updated after rules complete |
| `PRD.md` | FRs, milestones, cross-references to MECH + DA anchors | ✅ Up to date — Section 6 UI flows need PRD→UI_REQUIREMENTS.md reconciliation pass |

### PRD vs UI_REQUIREMENTS.md gap

PRD Section 3 and Section 6 still describe the old tile dashboard layout. UI_REQUIREMENTS.md supersedes this. Before breaking down FRs, update PRD Section 3 and Section 6 to reference `UI_REQUIREMENTS.md` as authoritative and remove the conflicting tile descriptions.

---

## Rules Expansion — Completed 2026-03-21

**Source file:** `260321 jovian_subspecies_cepheus.md`

| Species | State |
|---------|-------|
| Terran (was "Terrestrial Human") | ✅ MECH-4.8.1, DA-3.1 |
| Voidborn (was "Low-G Human") | ✅ MECH-4.8.2 — full Chlorosymbiont, Chloro-fade, Zero-G Native, High-G Intolerance |
| Jovian | ✅ MECH-4.8.3 — Radosymbiont, Symbiont Hunger, Low-G Intolerance, adv1+1 dice |
| Half-Jovian | ✅ MECH-4.8.4 — adaptation spectrum 1d6 table |
| Esper | ⚠️ Referenced (DA-3.1) — full traits not expanded yet |
| Merfolk | ⚠️ Referenced (DA-3.1) — full traits not expanded yet |

**Medical procedures encoded:**
- MECH-4.10.1 Chlorosymbiont Transplant (Terran → Voidborn metabolics)
- MECH-4.10.2 Radosymbiont Transplant (Terran → Jovian radiation resistance — RadRes 2, no bloom organs)
- MECH-4.10.3 CJVAP Implant (Cranial Jugular Venous Assist Pump — removes microgravity END penalty)

**Environmental conditions encoded:**
- MECH-4.9.1 Low-G Conditions (atrophy, acquired adaptation)
- MECH-4.9.2 High-G Conditions (fatigue table by G-band, acquired adaptation)
- MECH-4.9.3 High-Radiation Conditions (rads/day table, cumulative dose thresholds, Radiation Resistance interaction)

**Renames applied across all docs:**
- "Terrestrial Human" → "Terran" (mechanics, DATA_ARCHITECTURE, PRD)
- "Low-G Human" → "Voidborn" (mechanics, DATA_ARCHITECTURE, PRD)
- `toggles.lowGHuman` → `toggles.voidborn`; added `toggles.jovian`

---

## Next Actions (in order)

1. **PRD reconciliation pass** — update PRD Section 3 + Section 6 to reference UI_REQUIREMENTS.md as authoritative; strip old tile UI descriptions (the PRD still describes tile dashboard; UI_REQUIREMENTS.md resolves accordion/phone-first)
2. **FR breakdown** — walk M0 → M4 and write per-FR acceptance criteria inch by inch
   - Start with M0: author all 6 species JSON entries, all 24 careers, all supporting tables
   - Then M1: scaffold, routing, PWA, empty screens
   - Then M2: settings, data editors, toggle mechanics
3. **(Later) Esper and Merfolk full entries** — traits not yet expanded in mechanics file

---

## Untracked Files (commit when ready)

- `app_information_architecture.svg`
- `library_structure_and_views.svg`
- `settings_architecture.svg`
- `260321 jovian_subspecies_cepheus.md` ← source material, should be committed or moved to `docs/` or `reference/`
- `UPDATE_LOG.md` ← this file
