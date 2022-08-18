use anchor_lang::prelude::*;

declare_id!("EuvWCxkypf4LWvmnrSfiyCFdpNJN3bPmGKfkEcVco8SD");

#[program]
mod quilt {
    use super::*;
    pub fn create_user(ctx: Context<UserToKeys>,
                       _x: String,
                      _y : String) -> Result<()> {
        let user = &mut ctx.accounts.point;
        user.x = _x;
        user.y = _y;
        user.bump = *ctx.bumps.get("point").unwrap();
        Ok(())
    }

    pub fn update_user(ctx: Context<Updateuser>,
                _x: String,
                _y : String
                ) -> Result<()>{
                ctx.accounts.point.x = _x;
                ctx.accounts.point.y = _y;
                    Ok(())
                }
    
    pub fn update_one(ctx: Context<Updateuser>,
                    _x: String,
                    ) -> Result<()>{
                        let user = &mut ctx.accounts.point;
                    user.x = _x;
                        Ok(())
                    }
}


#[derive(Accounts)]
pub struct UserToKeys<'info>{
    #[account(mut)]
    pub user :Signer<'info>,

    #[account(
        init,
        payer = user,
        space = 8 + 2 + 4 + 200 + 1, seeds = [b"point", user.key().as_ref()], bump
    )]

    pub point : Account<'info,Point>,
    pub system_program : Program<'info,System>,
}
#[derive(Accounts)]
pub struct Updateuser<'info> {
    pub user : Signer<'info>,

    #[account(mut, seeds = [b"point", user.key().as_ref()], bump = point.bump)]
    pub point: Account<'info, Point>,
}

#[account]
pub struct Point {
    x : String,
    y: String,
    bump : u8,
}

