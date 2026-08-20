# public

What is in here and why, so nothing gets deleted by accident or left rotting.

## the rule

Everything is webp. Ship at **1600 wide**, which is two times the largest place any of
it actually renders (the reading column tops out near 720, a home card near 520). The
2400 wide masters are not kept in the repo, they live on the Desktop, because shipping
2400 to a 720 slot is a megabyte of nothing. Convert with:

    cwebp -q 80 -resize 1600 0 source.png -o public/whatever/hero.webp

## the folders

- `banners/` the wide plate under the nav on the home page. One file, courthouse and
  chimney with the ship, the two landmarks you can see from town.
- `log/<slug>/` one folder per blog entry. `hero.webp` is the lead, everything else is
  named for what it is. An entry's art never lives outside its own folder.
- `crew/` character portraits, waiting on the crew section being built. Not dead.
- `brand/` brand objects rather than scenery, the vending machine and anything like it.
  Also waiting on a section.
- `burroship-mark.webp` the bare mark, no background, used in the nav and the footer.
- `burroship-logo.webp` the mark on its own dark chip, used where the surface is light.

## before deleting anything

Grep for the path first. `crew/` and `brand/` will read as unused until the sections
that use them exist, and `log/ancient-ridgway/early-autumn.webp` is held for when that
entry gets expanded. Unused is not the same as unwanted.
