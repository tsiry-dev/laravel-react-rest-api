<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function findAll(string $id)
    {
        return  response()->json([
           'data' => Contact::where('user_id', $id)->get()
        ]);
    }

    public function destroy(Request $request)
    {
        $contact = Contact::find($request->id);

        if(!$contact) {
            return response()->json([
                'message' => 'Impossible de trouver l\'utilisateur.'
            ], 404);
        }

        $contact->delete();
    }
}
