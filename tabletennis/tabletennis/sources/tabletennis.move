module tabletennis{

    struct GameState has store {
        player1_score: u32,
        player2_score: u32,
        current_server: u8,  // 1 for Player 1, 2 for Player 2
        game_status: u8,  // 0 = ongoing, 1 = Player 1 wins, 2 = Player 2 wins
        server_switch_count: u32,  // Count of serves to determine when to switch server
    }

    public fun initialize(): GameState {
        GameState {
            player1_score: 0,
            player2_score: 0,
            current_server: 1,
            game_status: 0,
            server_switch_count: 0,
        }
    }

    public fun score_point(game_state: &mut GameState, player: u8) {
        assert!(player == 1 || player == 2, 1);  // Ensure valid player

        if (game_state.game_status != 0) {
            return;  // No scoring if the game is not ongoing
        }

        if (player == 1) {
            game_state.player1_score += 1;
        } else {
            game_state.player2_score += 1;
        }

        // Check for a win condition
        if (game_state.player1_score >= 11 && game_state.player1_score - game_state.player2_score >= 2) {
            game_state.game_status = 1;  // Player 1 wins
        } else if (game_state.player2_score >= 11 && game_state.player2_score - game_state.player1_score >= 2) {
            game_state.game_status = 2;  // Player 2 wins
        }

        // Switch server every 5 serves
        game_state.server_switch_count += 1;
        if (game_state.server_switch_count >= 5) {
            game_state.current_server = if (game_state.current_server == 1) 2 else 1;
            game_state.server_switch_count = 0;
        }
    }

    public fun get_scores(game_state: &GameState): (u32, u32) {
        (game_state.player1_score, game_state.player2_score)
    }

    public fun get_current_server(game_state: &GameState): u8 {
        game_state.current_server
    }

    public fun get_game_status(game_state: &GameState): u8 {
        game_state.game_status
    }
}
