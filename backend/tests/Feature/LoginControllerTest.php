<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Class LoginControllerTest
 *
 * This class contains feature tests for the LoginController.
 */
class LoginControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test successful login.
     *
     * This test verifies that a user can successfully log in with correct
     * credentials and receive an authentication token.
     *
     * @return void
     */
    public function testSuccessfulLogin()
    {
        $user = User::factory()->create([
            'email' => 'test@test.com',
            'password' => bcrypt('password'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'test@test.com',
            'password' => 'password',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'token',
                'id',
            ])
            ->assertJson([
                'id' => $user->id,
            ]);
    }

    /**
     * Test login with invalid credentials.
     *
     * This test verifies that a login attempt with incorrect credentials
     * returns an unauthorized error.
     *
     * @return void
     */
    public function testLoginWithInvalidCredentials()
    {
        User::factory()->create([
            'email' => 'test@test.com',
            'password' => bcrypt('password'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'test@test.com',
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(401)
            ->assertJson(['error' => 'Unauthorized']);
    }

    /**
     * Test login with validation errors.
     *
     * This test verifies that login attempts with missing or invalid
     * credentials return appropriate validation errors.
     *
     * @return void
     */
    public function testLoginWithValidationErrors()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'invalid-email',
            'password' => '',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email', 'password']);
    }
}
